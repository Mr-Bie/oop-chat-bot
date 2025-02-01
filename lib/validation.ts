import { AUTH_CONFIG } from "@/constants/config";
import { ERROR_MESSAGES } from "@/constants/ui";
import * as yup from "yup";

export const passwordValidator = yup
  .string()
  .min(AUTH_CONFIG.PASSWORD.MIN_LENGTH, ERROR_MESSAGES.PASSWORD_MIN_LENGTH)
  .required(ERROR_MESSAGES.PASSWORD_REQUIRED);

export const passwordRepeatValidator = yup
  .string()
  .oneOf([yup.ref("password")], ERROR_MESSAGES.PASSWORD_REPEAT_INVALID)
  .when("$isClient", {
    is: true, // Only validate passwordRepeat on the client-side
    then: (schema) => schema.required(ERROR_MESSAGES.PASSWORD_REPEAT_INVALID),
    otherwise: (schema) => schema.notRequired(),
  });

export const emailValidator = yup
  .string()
  .email(ERROR_MESSAGES.EMAIL_INVALID)
  .required(ERROR_MESSAGES.EMAIL_REQUIRED);

export const otpValidator = yup
  .string()
  .max(AUTH_CONFIG.OTP.LENGTH)
  .min(AUTH_CONFIG.OTP.LENGTH)
  .length(AUTH_CONFIG.OTP.LENGTH)
  .required();

export const captchaValidator = yup
  .string()
  .required(ERROR_MESSAGES.CAPTCHA_REQUIRED);

export const nameValidator = yup
  .string()
  .min(3, ERROR_MESSAGES.FIRST_NAME_SHORT)
  .required(ERROR_MESSAGES.FIRST_NAME_SHORT);

export const phoneNumberValidator = yup
  .string()
  .matches(/^09\d{9}$/, ERROR_MESSAGES.PHONE_NUMBER_INVALID)
  .required(ERROR_MESSAGES.PHONE_NUMBER_REQUIRED);

// Validation for Iranian National ID
export const nationalIdValidator = yup
  .string()
  .length(10, ERROR_MESSAGES.NATIONAL_ID_INVALID)
  .matches(/^\d{10}$/, ERROR_MESSAGES.NATIONAL_ID_INVALID)
  .test("is-valid-id", ERROR_MESSAGES.NATIONAL_ID_INVALID, (value) => {
    if (!value) return false;

    const check = parseInt(value[9]);
    const sum = value
      .split("")
      .slice(0, 9)
      .reduce((acc, digit, idx) => acc + parseInt(digit) * (10 - idx), 0);

    const remainder = sum % 11;
    return (
      (remainder < 2 && check === remainder) ||
      (remainder >= 2 && check === 11 - remainder)
    );
  })
  .required(ERROR_MESSAGES.NATIONAL_ID_REQUIRED);
