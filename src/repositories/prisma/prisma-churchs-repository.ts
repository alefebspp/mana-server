import { Church, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { ChurchsRepository } from '../churchs-repository'


export class PrismaChurchsRepository implements ChurchsRepository {

  async create(data: Omit<Prisma.ChurchUncheckedCreateInput, 'id'>): Promise<void> {
    await prisma.church.create({
      data
    })
  }

  async list(): Promise<Church[]> {
    const churchs = await prisma.church.findMany()

    return churchs
  }

  async update(data: Omit<Prisma.ChurchUpdateInput, 'id'>, church_id: string): Promise<void> {
    await prisma.church.update({
      where: {
        id: church_id
      },
      data
    })
  }

  async find(church_id: string): Promise<Church | null> {
    const church = await prisma.church.findUnique({
      where: {
        id: church_id
      }
    })

    return church
  }

}