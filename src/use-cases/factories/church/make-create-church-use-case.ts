import { PrismaChurchsRepository } from '@/repositories/prisma/prisma-churchs-repository'
import { CreateChurchUseCase } from '../../create-church-use-case'

export function makeCreateChurchUseCase() {
  const churchsRepository = new PrismaChurchsRepository()
  const createChurchUseCase = new CreateChurchUseCase(churchsRepository)
  return createChurchUseCase
}