import { expect, describe, it } from 'vitest'
import { compare } from 'bcryptjs'

import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Registrar Caso de Uso', () => {

  it('deve ser capaz de registrar', async () => {

    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.executar({
      name: 'nometeste',
      email: 'nometeste@gmail.com',
      password: 'nometeste123'
    })
    expect(user.id).toEqual(expect.any(String))
  })

  it('deve ser capaz de verificar hash a senha do usuário no registro', async () => {

    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.executar({
      name: 'nometeste',
      email: 'nometeste@gmail.com',
      password: 'nometeste123'
    })

    const isPasswordCorrectlyHashed = await compare(
      'nometeste123',
      user.password_hash
    )
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('Não deve ser capaz de se registrar com o mesmo e-mail duas vezes', async () => {

    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.executar({
      name: 'nometeste',
      email: 'nometeste@gmail.com',
      password: 'nometeste123'
    })

    await expect(() => registerUseCase.executar({
      name: 'nometeste',
      email: 'nometeste@gmail.com',
      password: 'nometeste123'
    }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

})