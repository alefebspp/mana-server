import { PrismaChurchEventsRepository } from '@/repositories/prisma/prisma-church-events-repository'
import { CreateChurchEventUseCase } from '@/use-cases/create-church-event-use-case'

export function makeCreateChurchEventUseCase() {
  const churchEventsRepository = new PrismaChurchEventsRepository()
  const createChurchEventUseCase = new CreateChurchEventUseCase(churchEventsRepository)
  return createChurchEventUseCase
}