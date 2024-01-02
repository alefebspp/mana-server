import { Category, Prisma } from '@prisma/client'
import { CategoriesRepository } from '../categories-repository'
import { prisma } from '@/lib/prisma'


export class PrismaCategoriesRepository implements CategoriesRepository {
  async create(data: Prisma.CategoryCreateInput): Promise<void> {
    await prisma.category.create({data})
  }

  async list(belongs_to?: string | undefined): Promise<Category[]> {

    const where = {}

    if(belongs_to){
      Object.assign(where, {
        OR: [
          {
            id: belongs_to
          },
          {
            belongs_to
          }
        ]
      })
    }

    const categories = await prisma.category.findMany({
      where,
      orderBy: {
        code: 'asc'
      }
    })

    return categories
  }

}