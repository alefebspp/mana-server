import { ChurchEvent, Prisma } from '@prisma/client'
import { ChurchEventsRepository } from '../church-events-repository'
import { prisma } from '@/lib/prisma'



export class PrismaChurchEventsRepository implements ChurchEventsRepository {
  async create(data: Omit<Prisma.ChurchEventUncheckedCreateInput, 'id'>): Promise<void> {
    await prisma.churchEvent.create({
      data
    })
  }
  
  async list(churchId: string): Promise<ChurchEvent[]> {
    const events = await prisma.churchEvent.findMany({
      where: {
        church_id: churchId
      }
    })

    return events
  }

  async delete(eventId: string): Promise<void> {
    await prisma.churchEvent.delete({where: {
      id: eventId
    }})
  }

  async find(eventId: string): Promise<ChurchEvent | null> {
    const event = await prisma.churchEvent.findUnique({where: {id: eventId}})

    return event
  }

  async update(eventId: string, data: Omit<Prisma.ChurchEventUncheckedUpdateInput, 'id' | 'church_id'>): Promise<void> {
    await prisma.churchEvent.update({where: {
      id: eventId
    }, data})
  }

}