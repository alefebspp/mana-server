import { Category, Prisma } from '@prisma/client'
import { CategoriesRepository } from '../categories-repository'

export class InMemoryCategoriesRepository implements CategoriesRepository {

  public categories: Category[] = []

  async create(data: Prisma.CategoryCreateInput): Promise<void> {
    const category = {
      ...data,
      id: `${this.categories.length}`,
      belongs_to: data.belongs_to as string | null
    }

    this.categories.push(category)
  }

  async list(belongs_to?: string | undefined): Promise<Category[]> {
    if(belongs_to){
      const childCategories = this.categories.filter(category => category.belongs_to === belongs_to)
      const parentCategory = this.categories.filter(category => category.id === belongs_to) 
      return [...parentCategory, ...childCategories]
    }
    return this.categories
  }

}