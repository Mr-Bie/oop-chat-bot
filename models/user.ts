import prisma from "@/lib/prisma";

export interface UserInfo {
  id: number;
  email: string;
  name: string | null;
}

export const getUserInfo = async (id: number): Promise<UserInfo | null> => {
  if (!id) return null;

  return await prisma.user.findFirstOrThrow({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};
