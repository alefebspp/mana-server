import { PrismaChurchsRepository } from '@/repositories/prisma/prisma-churchs-repository'
import { UpdateChurchUseCase } from '../../update-church-use-case'

export function makeUpdateChurchUseCase() {
  const churchsRepository = new PrismaChurchsRepository()
  const updateChurchUseCase = new UpdateChurchUseCase(churchsRepository)
  return updateChurchUseCase
}