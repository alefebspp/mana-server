import { InMemoryChurchsRepository } from '@/repositories/in-memory/in-memory-churchs-repository'
import { ListChurchsUseCase } from './list-churchs-use-case'
import { beforeEach, describe, expect, it } from 'vitest'



let churchsRepository: InMemoryChurchsRepository
let sut: ListChurchsUseCase

describe('List churchs use case', () => {

  beforeEach(async () => {
    churchsRepository = new InMemoryChurchsRepository()
    sut = new ListChurchsUseCase(churchsRepository)
    await churchsRepository.create({
      name: 'Ministry Victory in Christ',
      leader: 'leader-name',
      email: 'mvc@email.com',
      cnpj: 'XX.XXX.XXX/0001-XX',
      user_id: 'b5be3969-e735-4b93-bebf-e4ee40fa9dc6'
    })
  })

  it('should list all churchs properly', async() => {

    const {churchs} = await sut.execute({userId:'b5be3969-e735-4b93-bebf-e4ee40fa9dc6'})

    expect(churchs).toEqual([
      expect.objectContaining({user_id:'b5be3969-e735-4b93-bebf-e4ee40fa9dc6' })
    ])
  })
})