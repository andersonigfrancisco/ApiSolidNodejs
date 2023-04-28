import { hash } from 'bcryptjs'

import { prisma } from '@/lib/prisma'

interface RegisterUserCaseRequest {
  name: string,
  email: string,
  password: string
}

export async function registerUserCase({
  name,
  email,
  password
}: RegisterUserCaseRequest) {

  const userWithsomeEmail = await prisma.user.findUnique({
    where: { email }
  })

  if (userWithsomeEmail)
    throw new Error('E-mail already exists.');

  const password_hash = await hash(password, 6)

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })
}