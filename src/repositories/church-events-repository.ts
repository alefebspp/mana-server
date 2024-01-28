import { ChurchEvent, Prisma } from '@prisma/client'

export interface ChurchEventsRepository {
  create(data: Omit<Prisma.ChurchEventUncheckedCreateInput, 'id'>): Promise<void>
  list(churchId: string): Promise<ChurchEvent[]>
  delete(eventId: string): Promise<void>
  find(eventId: string): Promise<ChurchEvent | null>
  update(eventId: string, data: Omit<Prisma.ChurchEventUncheckedUpdateInput, 'id' | 'church_id'>): Promise<void>
}