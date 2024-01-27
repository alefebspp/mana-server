import { Church, Prisma } from '@prisma/client'
import { ChurchsRepository } from '../churchs-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryChurchsRepository implements ChurchsRepository {
  public churchs: Church[] = []

  async list(userId: string): Promise<Church[]> {
    return this.churchs.filter(church => church.user_id === userId)
  }

  async update(data: Omit<Prisma.ChurchUpdateInput, 'id' | 'user'>, church_id: string): Promise<void> {
    const church = this.churchs.find(church => church.id === church_id)

    if(church){
      Object.assign(church, {...data})
    }
  }

  async find(church_id: string): Promise<Church | null> {
    const church = this.churchs.find(church => church.id === church_id)

    if(!church){
      return null
    }

    return church
  }

  async create(data: Omit<Prisma.ChurchUncheckedCreateInput, 'id'>): Promise<void> {
    this.churchs.push({...data, id: randomUUID()})
  }

}