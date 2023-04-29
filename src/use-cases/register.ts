import { hash } from 'bcryptjs'

import { UsersRepository } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { User } from '@prisma/client';

interface RegisterUserCaseRequest {
  name: string,
  email: string,
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {

  constructor(private usersRepository: UsersRepository) { }

  async executar({ name, email, password }: RegisterUserCaseRequest): Promise<RegisterUseCaseResponse> {

    const userWithsomeEmail = await this.usersRepository.findByEmail(email);

    if (userWithsomeEmail)
      throw new UserAlreadyExistsError();

    const password_hash = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash
    });

    return {
      user,
    }
  }
}