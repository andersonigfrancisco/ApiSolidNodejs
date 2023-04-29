import { Prisma, User } from "@prisma/client"

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findByEmial(email: string): Promise<User | null>
}