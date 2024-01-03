import {expect, it, describe, beforeEach} from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Register Use Case', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async() => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6)
    })

    const {user} = await sut.execute({email: 'johndoe@example.com', password:'123456'})

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate if email doesnt exists', async() => {

    expect(async () => await sut.execute({email: 'incorrect@example.com', password:'123456'})).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate if password is wrong', async() => {

    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6)
    })

    expect(async () => await sut.execute({email: 'johndoe@example.com', password:'123123'})).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

})