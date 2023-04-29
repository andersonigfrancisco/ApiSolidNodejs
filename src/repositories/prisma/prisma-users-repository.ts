import { Prisma, User } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {

  async create(data: Prisma.UserCreateInput) {
    return await prisma.user.create({
      data
    })
  }

  async findByEmial(email: string) {
    return await prisma.user.findUnique({
      where: { email }
    })
  }
}