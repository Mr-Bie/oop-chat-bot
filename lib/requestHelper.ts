import { TOAST_MESSAGES } from "@/constants/ui";
import axiosClient from "./axiosClient";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiErrorResponse } from "@/types/api/error";
import { ApiSuccessfulResponse } from "@/types/api/success";
import { getToken } from "./auth/token";

/**
 * Sends an API request using the provided Axios configuration and handles the response.
 *
 * @template TRequest - The type of the request data.
 * @template TResponse - The type of the response data.
 * @param {AxiosRequestConfig<TRequest>} config - The Axios request configuration.
 * @param {(params: { data: unknown; message: string }) => void} failedCallback - The callback function to be executed if the request fails.
 * @param {(params: { responseData: TResponse; message: string }) => void} successfulCallback - The callback function to be executed if the request is successful.
 * @returns {Promise<void>} A promise that resolves when the request is completed.
 */
export async function sendApiRequest<TRequest, TResponse>(
  config: AxiosRequestConfig<TRequest>,
  failedCallback: (params: { data: unknown; message: string }) => void,
  successfulCallback: (params: {
    responseData: TResponse;
    message: string;
  }) => void,
  authorized = false
) {
  let response;
  try {
    const token = await getToken();

    response = await axiosClient.request<
      AxiosRequestConfig,
      AxiosResponse<ApiSuccessfulResponse<TResponse>>
    >({
      data: config.data as TRequest,
      headers: {
        ...config.headers,
        Authorization: authorized ? `Bearer ${token}` : "",
      },
      ...config,
    });
  } catch (err: unknown) {
    const axiosError = err as AxiosError<ApiErrorResponse>;
    const message =
      axiosError.response?.data.message instanceof Array
        ? axiosError.response?.data.message[0]
        : axiosError.response?.data.message ||
          axiosError.response?.data.error ||
          TOAST_MESSAGES.FAILED_REQUEST_DEFAULT_MESSAGE;
    console.log("axios request message ", message);

    return failedCallback({
      data: response?.data,
      message,
    });
  }

  console.log("successful request with data ", response?.data);
  const message =
    response.data.message || TOAST_MESSAGES.SUCCESSFUL_REQUEST_DEFAULT_MESSAGE;

  return successfulCallback({
    responseData: response.data?.data as TResponse,
    message,
  });
}
