import prisma from "@/lib/prisma";

export interface UserInfo {
  id: string;
  email: string;
  name: string;
}

export const getUserInfo = async (id: string): Promise<UserInfo | null> => {
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
