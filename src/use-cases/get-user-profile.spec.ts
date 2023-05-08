import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { GetUserProfileUseCase } from '@/use-cases/get-user-profile'
import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Obter caso de uso de perfil de usuário', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('deve ser capaz de obter o perfil do usuário', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    await expect(user.name).toEqual('John Doe')
  })

  it('não deve ser capaz de obter o perfil do usuário com id errado', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})