import { Category, Prisma } from '@prisma/client'
import { CategoriesRepository } from '../categories-repository'
import { prisma } from '@/lib/prisma'


export class PrismaCategoriesRepository implements CategoriesRepository {


  async update(id: string, data: Omit<Prisma.CategoryUpdateInput, 'id'>): Promise<void> {
    await prisma.category.update({where: {
      id
    }, data: {...data}})
  }

  async find(id: string): Promise<Category | null> {
    const category = await prisma.category.findUnique({where: {
      id
    }})

    return category
  }
 
  async create(data: Prisma.CategoryCreateInput): Promise<void> {
    await prisma.category.create({data})
  }

  async list(belongs_to?: string | undefined, hidden?: boolean): Promise<Category[]> {

    const where = {
      hidden: false
    }

    if(hidden){
      Object.assign(where, {
        hidden: true
      })
    }

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