import { expect, describe, it, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'

import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Registrar Caso de Uso', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('deve ser capaz de registrar', async () => {

    const { user } = await sut.executar({
      name: 'nometeste',
      email: 'nometeste@gmail.com',
      password: 'nometeste123'
    })
    await expect(user.id).toEqual(expect.any(String))
  })

  it('deve ser capaz de verificar hash a senha do usuário no registro', async () => {

    const { user } = await sut.executar({
      name: 'nometeste',
      email: 'nometeste@gmail.com',
      password: 'nometeste123'
    })

    const isPasswordCorrectlyHashed = await compare(
      'nometeste123',
      user.password_hash
    )
    await expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('Não deve ser capaz de se registrar com o mesmo e-mail duas vezes', async () => {

    const { user } = await sut.executar({
      name: 'nometeste',
      email: 'nometeste@gmail.com',
      password: 'nometeste123'
    })

    await expect(() => sut.executar({
      name: 'nometeste',
      email: 'nometeste@gmail.com',
      password: 'nometeste123'
    }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

})