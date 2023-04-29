import { hash } from 'bcryptjs'

import { UsersRepository } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

interface RegisterUserCaseRequest {
  name: string,
  email: string,
  password: string
}

export class RegisterUseCase {

  constructor(private usersRepository: UsersRepository) { }

  async executar({ name, email, password }: RegisterUserCaseRequest) {

    const userWithsomeEmail = await this.usersRepository.findByEmial(email);

    if (userWithsomeEmail)
      throw new UserAlreadyExistsError();

    const password_hash = await hash(password, 6)

    await this.usersRepository.create({
      name,
      email,
      password_hash
    });
  }
}