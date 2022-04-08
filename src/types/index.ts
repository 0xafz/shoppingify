import { User } from "@prisma/client"

export type DecodedUser = {
  id: number
  [x: string]: any
}

export type IUser = Omit<User, "password">

export type Awaited<T> = T extends PromiseLike<infer U> ? U : T
