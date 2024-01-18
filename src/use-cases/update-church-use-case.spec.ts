import { InMemoryChurchsRepository } from '@/repositories/in-memory/in-memory-churchs-repository'
import { UpdateChurchUseCase } from './update-church-use-case'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'


let churchsRepository: InMemoryChurchsRepository
let sut: UpdateChurchUseCase

describe('Update church use case', () => {
  beforeEach(async () => {
    churchsRepository = new InMemoryChurchsRepository()
    sut = new UpdateChurchUseCase(churchsRepository)

    await churchsRepository.create({
      name: 'Ministry Victory in Christ',
      leader: 'leader-name',
      email: 'mvc@email.com',
      cnpj: 'XX.XXX.XXX/0001-XX',
      user_id: 'b5be3969-e735-4b93-bebf-e4ee40fa9dc6'
    })
  })

  it('should properly update a church', async() => {
    expect(churchsRepository.churchs[0]).toEqual(expect.objectContaining({leader: 'leader-name'}))

    await sut.execute({data: {leader: 'new-leader-name'}, church_id: churchsRepository.churchs[0].id})

    expect(churchsRepository.churchs[0]).toEqual(expect.objectContaining({leader: 'new-leader-name'}))
  })

  it('should throw if church doenst exists', async() => {
    
    expect(async() => await sut.execute({data: {}, church_id: 'wrong-id'})).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})