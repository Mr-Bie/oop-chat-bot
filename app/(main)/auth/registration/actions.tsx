// app/auth/signup/actions.ts
'use server';
import * as yup from 'yup';
import { ActionResponse, parseFromFormData } from '@/lib/action';
import {
  emailValidator,
  passwordValidator,
} from '@/lib/validation';
import prisma from '@/lib/prisma';
import { hashPassword } from '@/lib/auth/authUtils';
import { ACTION_RESPONSE_MESSAGES } from '@/constants/ui';

const userRegistrationSchema = yup.object().shape({
  name: yup.string().required(),
  email: emailValidator,
  password: passwordValidator,
});


export async function userRegistrationAction(data: FormData): ActionResponse {
  let validatedData;
  try {
    validatedData = await userRegistrationSchema.validate(
      parseFromFormData(data)
    );
  } catch (err) {
    console.log('error in validation create event', err);
    return {
      success: false,
      message: ACTION_RESPONSE_MESSAGES.BAD_REQUEST,
    };
  }

  const { password, name, email } = validatedData;

  const hashedPassword = await hashPassword(password);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return {
    success: true,
    data: ACTION_RESPONSE_MESSAGES.SIGNUP_SUCCESSFUL,
  };
}
