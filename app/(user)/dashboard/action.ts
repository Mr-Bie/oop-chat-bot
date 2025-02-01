"use server";

import { ACTION_RESPONSE_MESSAGES } from "@/constants/ui";
import { ActionResponse, parseFromFormData } from "@/lib/action";
import { authOptions } from "@/lib/auth/authOptions";
import { hashPassword } from "@/lib/auth/authUtils";
import prisma from "@/lib/prisma";
import {
  emailValidator,
  nameValidator,
  passwordValidator,
} from "@/lib/validation";
import { getServerSession } from "next-auth/next";
import * as yup from "yup";

const editUserProfileSchema = yup.object().shape({
  id: yup.number().required(),
  name: nameValidator,
  email: emailValidator,
});

export async function editUserProfileAction(data: FormData): ActionResponse {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return {
      success: false,
      message: ACTION_RESPONSE_MESSAGES.BAD_REQUEST,
    };
  }
  const userId = session.user.id;

  let validatedData;
  try {
    validatedData = await editUserProfileSchema.validate(
      parseFromFormData(data)
    );
  } catch (err) {
    console.log("error in validation create event", err);
    return {
      success: false,
      message: ACTION_RESPONSE_MESSAGES.BAD_REQUEST,
    };
  }

  const { ...rest } = validatedData;

  await prisma.user.update({
    where: {
      id: Number(userId),
    },
    data: rest,
  });

  return { success: true, data: ACTION_RESPONSE_MESSAGES.SUCCESS };
}

const editUserPasswordSchema = yup.object().shape({
  password: passwordValidator,
});

export async function editUserPasswordAction(data: FormData): ActionResponse {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return {
      success: false,
      message: ACTION_RESPONSE_MESSAGES.BAD_REQUEST,
    };
  }
  const id = session.user.id;

  let validatedData;
  try {
    validatedData = await editUserPasswordSchema.validate(
      parseFromFormData(data)
    );
  } catch (err) {
    console.log("error in validation create event", err);
    return {
      success: false,
      message: ACTION_RESPONSE_MESSAGES.BAD_REQUEST,
    };
  }

  const hashedPassword = await hashPassword(validatedData.password);

  await prisma.user.update({
    where: { id: Number(id) },
    data: { password: hashedPassword },
  });

  return { success: true, data: ACTION_RESPONSE_MESSAGES.SUCCESS };
}
