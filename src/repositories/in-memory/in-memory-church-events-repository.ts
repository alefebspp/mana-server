import { ChurchEvent, Prisma } from '@prisma/client'
import { ChurchEventsRepository } from '../church-events-repository'
import { randomUUID } from 'node:crypto'



export class InMemoryChurchEventsRepository implements ChurchEventsRepository {
  public events: ChurchEvent[] = []


  async create(data: Omit<Prisma.ChurchEventUncheckedCreateInput, 'id'>): Promise<void> {
    this.events.push({
      ...data,
      id: randomUUID()
    })
  }
  async list(churchId: string): Promise<ChurchEvent[]> {
    return this.events.filter(event => event.church_id == churchId)
  }

  async delete(eventId: string): Promise<void> {
    const targetEvent = this.events.find(event => event.id === eventId)

    if(targetEvent){
      this.events = this.events.filter(event => event !== targetEvent)
    }
  }

  async find(eventId: string): Promise<ChurchEvent | null> {
    const event = this.events.find(event => event.id === eventId)

    if(event){
      return event
    }
    return null
  }

  async update(eventId: string, data: Omit<Prisma.ChurchEventUncheckedUpdateInput, 'id' | 'church_id'>): Promise<void> {
    const targetEvent = this.events.find(event => event.id === eventId)

    if(targetEvent){
      Object.assign(targetEvent, {...data})
    }
  }

}