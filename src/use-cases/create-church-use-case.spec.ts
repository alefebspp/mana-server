import { CreateChurchUseCase } from './create-church-use-case'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryChurchsRepository } from '@/repositories/in-memory/in-memory-churchs-repository'


let churchsRepository: InMemoryChurchsRepository
let sut: CreateChurchUseCase

describe('Create Church use case', () => {
  beforeEach(() => {
    churchsRepository = new InMemoryChurchsRepository()
    sut = new CreateChurchUseCase(churchsRepository)
  })

  it('should create a new church', async () => {
    await sut.execute({
      name: 'Ministry Victory in Christ',
      leader: 'leader-name',
      email: 'mvc@email.com',
      cnpj: 'XX.XXX.XXX/0001-XX',
      user_id: 'b5be3969-e735-4b93-bebf-e4ee40fa9dc6'
    })

    expect(churchsRepository.churchs.length).toBeGreaterThan(0)
  })
  
  it('sohuld create a new church with properly cnpj forma', async() => {
    await sut.execute({
      name: 'Ministry Victory in Christ',
      leader: 'leader-name',
      email: 'mvc@email.com',
      cnpj: 'XX.XXX.XXX/0001-XX',
      user_id: 'b5be3969-e735-4b93-bebf-e4ee40fa9dc6'
    })

    const church = churchsRepository.churchs[0]
    expect(/^[A-Z0-9]{2}\.[A-Z0-9]{3}\.[A-Z0-9]{3}\/[A-Z0-9]{4}-[A-Z0-9]{2}$/.test(church.cnpj)).toBe(true)
  })
})