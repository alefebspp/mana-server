import { PrismaChurchEventsRepository } from '@/repositories/prisma/prisma-church-events-repository'
import { ListChurchEventsUseCase } from '@/use-cases/list-church-events-use-case'

export function makeListChurchEventsUseCase(){
  const churchEventsRepository = new PrismaChurchEventsRepository()
  const listChurchEventsUseCase = new ListChurchEventsUseCase(churchEventsRepository)
  return listChurchEventsUseCase
}