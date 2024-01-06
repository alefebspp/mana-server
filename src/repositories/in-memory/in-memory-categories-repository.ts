import { Category, Prisma } from '@prisma/client'
import { CategoriesRepository } from '../categories-repository'

export class InMemoryCategoriesRepository implements CategoriesRepository {

  public categories: Category[] = []

  async find(id: string): Promise<Category | null> {
    const category = this.categories.find(category => category.id === id)

    if(!category){
      return null
    }

    return category
  }

  async create(data: Prisma.CategoryCreateInput): Promise<void> {
    const category = {
      ...data,
      id: `${this.categories.length}`,
      belongs_to: data.belongs_to as string | null,
      hidden: false
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

  async hide(id: string): Promise<void> {
    const category = this.categories.find(category => category.id === id)
    if(category){
      category.hidden = true
    }
  }

}