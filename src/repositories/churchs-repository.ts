import { Church, Prisma } from '@prisma/client'


export interface ChurchsRepository {
  create(data: Omit<Prisma.ChurchUncheckedCreateInput, 'id'>): Promise<void>
  list(): Promise<Church[]>
  update(data: Omit<Prisma.ChurchUpdateInput, 'id'>, church_id: string): Promise<void>
  find(church_id: string): Promise<Church | null>
}