"use server";

import bcrypt from "bcrypt";

export const hashPassword = async (password: string) =>
  bcrypt.hash(password, 12);
