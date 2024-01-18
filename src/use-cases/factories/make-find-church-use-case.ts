import { PrismaChurchsRepository } from '@/repositories/prisma/prisma-churchs-repository'
import { FindChurchUseCase } from '../find-church-use-case'

export function makeFindChurchUseCase() {
  const churchsRepository = new PrismaChurchsRepository()
  const findChurchUseCase = new FindChurchUseCase(churchsRepository)
  return findChurchUseCase
}