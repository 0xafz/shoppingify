import { Prisma } from "@prisma/client";

export const UserSelect: Prisma.userSelect = {
  id: true,
  email: true,
  name: true,
  avatar: true,
  createdAt: true,
  updatedAt: true,
  password: false,
};
