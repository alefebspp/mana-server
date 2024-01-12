import { Category, Prisma } from '@prisma/client'
import { CategoriesRepository } from '../categories-repository'

export class InMemoryCategoriesRepository implements CategoriesRepository {
  
  public categories: Category[] = []

  async update(id: string, data: Omit<Prisma.CategoryUpdateInput, 'id'>): Promise<void> {
    const category = this.categories.find(category => category.id === id)

    if(category){
      Object.assign(category, {...data})
    }
  }

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
      hidden: data.hidden ?? false
    }

    this.categories.push(category)
  }

  async list(belongs_to?: string | undefined, hidden?: boolean): Promise<Category[]> {
    let filteredCategories = this.categories

    if(hidden){
      filteredCategories = filteredCategories.filter(category => category.hidden == true)
    }

    if(belongs_to){
      const childCategories = this.categories.filter(category => category.belongs_to === belongs_to)
      const parentCategory = this.categories.filter(category => category.id === belongs_to) 
      filteredCategories = [...parentCategory, ...childCategories]
    }

    return filteredCategories
  }

}