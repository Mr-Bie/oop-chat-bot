import { useFieldArray, useFormContext } from 'react-hook-form';
import { Input, InputProps } from '@/components/ui/common/input';
import { Button } from '@/components/ui/common/button';

interface DynamicInputProps {
  name: string;
  inputs: InputProps[];
  label: string;
  addButtonText?: string;
  removeButtonText?: string;
  required?: boolean;
  defaultValue?: any;
}

const DynamicInputs: React.FC<DynamicInputProps> = ({
  name,
  inputs,
  addButtonText = '+',
  removeButtonText = '-',
  label,
  required = false,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext(); // Access form context
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return inputs.length ? (
    <div className="flex flex-col justify-evenly gap-4 py-4 px-4 border-dashed border-black border-2">
      <p className="">
        {label}
        {required && <span title="required"> *</span>}
      </p>
      {fields.map((field, index) => (
        <div
          key={field.id + index}
          className="w-full flex flex-row gap-4 items-start"
        >
          {inputs.map((input) => (
            <Input
              errormessage={errors?.[name]?.[index]?.[input.name]?.message}
              {...input}
              key={`${field.id}${name}.${index}.${input.name}input`}
              name={`${name}.${index}.${input.name}`}
            />
          ))}
          {/* Remove Button */}
          <Button
            className="text-lg"
            variant="destructiveOutline"
            type="button"
            onClick={() => remove(index)}
            key={`${field.id}${name}.${index}.button`}
          >
            {removeButtonText}
          </Button>
        </div>
      ))}

      {/* Add New Pair */}
      <div className="w-full flex justify-start items-center">
        <Button
          className="w-1/3 text-2xl"
          variant="outlineNeutral"
          type="button"
          onClick={() => append({})}
        >
          {addButtonText}
        </Button>
      </div>
      {errors[name] && (
        <p className="text-red-600 pt-1">{errors[name].message as string}</p>
      )}
    </div>
  ) : (
    <div></div>
  );
};

export default DynamicInputs;
