import { PrismaChurchsRepository } from '@/repositories/prisma/prisma-churchs-repository'
import { ListChurchsUseCase } from '../list-churchs-use-case'

export function makeListChurchsUseCase() {
  const churchsRepository = new PrismaChurchsRepository()
  const listChurchsUseCase = new ListChurchsUseCase(churchsRepository)
  return listChurchsUseCase
}