import { Prisma, User } from "@prisma/client";
import { prisma } from "@/lib/prisma";

import { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {

  findById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email }
    })
  }

  async create(data: Prisma.UserCreateInput) {
    return await prisma.user.create({
      data
    })
  }

}