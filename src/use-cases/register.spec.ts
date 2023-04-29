import { expect, describe, it } from 'vitest'
import { compare } from 'bcryptjs'

import { RegisterUseCase } from './register'


describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {

    const registerUseCase = new RegisterUseCase({

      async findByEmail(email) {
        return null;
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    })

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
})