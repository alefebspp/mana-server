import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryChurchEventsRepository } from '@/repositories/in-memory/in-memory-church-events-repository'
import { ListChurchEventsUseCase } from './list-church-events-use-case'



let churchEventsRepository: InMemoryChurchEventsRepository
let sut: ListChurchEventsUseCase

describe('List church events use case', () => {

  beforeEach(async () => {
    churchEventsRepository = new InMemoryChurchEventsRepository()
    sut = new ListChurchEventsUseCase(churchEventsRepository)

    await churchEventsRepository.create({
      name: 'Generic Event',
      week_day: 0,
      hour: '18:00',
      church_id: 'random-church-id'
    })
  })

  it('should list all churchs properly', async() => {

    const {events} = await sut.execute('random-church-id')

    expect(events).toEqual([
      expect.objectContaining({name: 'Generic Event'})
    ])
  })
})