import { InMemoryChurchEventsRepository } from '@/repositories/in-memory/in-memory-church-events-repository'
import { describe, it, expect, beforeAll } from 'vitest'
import { CreateChurchEventUseCase } from './create-church-event-use-case'

let churchEventsRepository: InMemoryChurchEventsRepository
let sut: CreateChurchEventUseCase

describe('Creat Church Event Use Case', () => {
  beforeAll(() => {
    churchEventsRepository = new InMemoryChurchEventsRepository()
    sut = new CreateChurchEventUseCase(churchEventsRepository)
  })

  it('should properly create a new church event', async() => {
    await sut.execute({
      name: 'Generic Event',
      week_day: 0,
      hour: '18:00',
      church_id: 'random-id'
    })

    expect(churchEventsRepository.events).toEqual([
      expect.objectContaining({name: 'Generic Event'})
    ])
  })
})