import { ACTION_RESPONSE_MESSAGES } from "@/constants/ui";

type SuccessFullActionResponse = {
  success: true;
  data: Record<string, unknown> | string;
};
type FailedActionResponse = { success: false; message: string };

export type ActionResponse = Promise<
  SuccessFullActionResponse | FailedActionResponse
>;

export function parseFromFormData(formData: FormData): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  // A helper function to navigate or create nested structures in result
  function setNestedValue(
    data: Record<string, unknown>,
    keys: string[],
    value: unknown
  ) {
    let current = data;

    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        if (Array.isArray(current[key])) {
          // If it's already an array, push the value
          current[key].push(value);
        } else {
          // Otherwise, just set the value
          current[key] = value;
        }
      } else {
        // If it's not the last key, navigate to the next level
        if (!current[key]) {
          console.log(
            "key ",
            key,
            typeof key,
            "next key is ",
            keys[index + 1],
            Number(keys[index + 1])
          );
          if (
            !Number.isNaN(Number(keys[index + 1])) &&
            typeof Number(keys[index + 1]) === "number"
          ) {
            console.log('salam"FDSF');
            current[key] = [];
          } else {
            current[key] = {};
          }
        }
        current = current[key] as Record<string, unknown>;
      }
    });
  }

  // Iterate over each FormData entry
  formData.forEach((value, key) => {
    const keys = key
      .split(/\[|\]/)
      .filter(Boolean)
      .map((v) => decodeURIComponent(escape(v))); // Split keys like 'files[0][name]'
    console.log(keys);
    // Handle file fields (e.g., files[0][name] or files[0][file])
    if (value instanceof File) {
      // Files should be grouped in an array under 'files' if nested
      const fileObj = { name: keys[keys.length - 2], file: value }; // Get the 'name' from the previous part of the key
      setNestedValue(result, keys.slice(0, -1), fileObj); // Remove the last part of the key (file or name) for the object
    } else {
      // Try parsing non-file values as JSON
      try {
        setNestedValue(result, keys, JSON.parse(value as string));
      } catch {
        // If parsing fails, treat it as a plain string
        setNestedValue(result, keys, value);
      }
    }
  });

  console.log("parsing data from formData result is ", result);

  return result;
}

export function parseToFormData(
  data: Record<string, unknown>,
  parentKey = ""
): FormData {
  const formData = new FormData();

  function appendFormData(key: string, value: unknown) {
    if (value instanceof File) {
      formData.append(key, value as string | Blob);
    } else if (value instanceof Blob) {
      formData.append(key, value, "blob");
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        appendFormData(`${key}[${index}]`, item);
      });
    } else if (typeof value === "object" && value !== null) {
      Object.keys(value).forEach((nestedKey) => {
        appendFormData(
          `${key}[${nestedKey}]`,
          (value as Record<string, unknown>)[nestedKey]
        );
      });
    } else {
      formData.append(key, value as string);
    }
  }

  Object.keys(data).forEach((key) => {
    const fullKey = parentKey ? `${parentKey}[${key}]` : key;
    appendFormData(fullKey, data[key]);
  });

  return formData;
}

export async function handleServerAction(
  data: Record<string, unknown>,
  action: (data: FormData) => ActionResponse,
  successCallback: (response: SuccessFullActionResponse) => void,
  failCallback: (response: FailedActionResponse) => void
) {
  const formData = parseToFormData(data);

  console.log(formData);

  let result, error;
  try {
    result = await action(formData);
  } catch (err) {
    error = err;
  }

  if (error || !result) {
    console.log("ridi ba in error " + error + " and result is " + result);
    failCallback({
      success: false,
      message: ACTION_RESPONSE_MESSAGES.FAILED,
    });
  }

  if (result?.success) {
    successCallback({ success: true, data: result.data });
  } else {
    failCallback({
      success: false,
      message: result?.message || ACTION_RESPONSE_MESSAGES.FAILED,
    });
  }
}
