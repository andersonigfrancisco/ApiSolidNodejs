import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CheckInUseCase } from '@/use-cases/check-in'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Caso de uso de check-in', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)
  })

  it('deve ser capaz de fazer o check-in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})