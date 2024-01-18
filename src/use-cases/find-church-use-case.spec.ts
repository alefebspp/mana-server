import { InMemoryChurchsRepository } from '@/repositories/in-memory/in-memory-churchs-repository'
import { FindChurchUseCase } from './find-church-use-case'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'



let churchsRepository: InMemoryChurchsRepository
let sut:FindChurchUseCase

describe('Find church use case', () => {
  beforeEach(async () => {
    churchsRepository = new InMemoryChurchsRepository()
    sut = new FindChurchUseCase(churchsRepository)
    
    await churchsRepository.create({
      name: 'Ministry Victory in Christ',
      leader: 'leader-name',
      email: 'mvc@email.com',
      cnpj: 'XX.XXX.XXX/0001-XX',
      user_id: 'b5be3969-e735-4b93-bebf-e4ee40fa9dc6'
    })
  })

  it('should find a category', async() => {
    const {church} = await sut.execute(churchsRepository.churchs[0].id)

    expect(church).toBeTruthy()
  })

  it('should throw if a church is not found', async() => {

    expect(async() => await sut.execute('wrong-id')).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})