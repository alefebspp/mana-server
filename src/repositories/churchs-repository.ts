import { Church, Prisma } from '@prisma/client'


export interface ChurchsRepository {
  create(data: Omit<Prisma.ChurchUncheckedCreateInput, 'id'>): Promise<void>
  list(userId: string): Promise<Church[]>
  update(data: Omit<Prisma.ChurchUpdateInput, 'id' | 'user'>, church_id: string): Promise<void>
  find(church_id: string): Promise<Church | null>
}