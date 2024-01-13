import { Category, Prisma } from '@prisma/client'

export interface CategoriesRepository {
  create(data: Prisma.CategoryCreateInput): Promise<void>;
  list(parentCategoryId?: string, hidde?: boolean): Promise<Category[]>
  find(id: string): Promise<Category | null>
  update(id: string, data: Omit<Prisma.CategoryUpdateInput, 'id'>): Promise<void>
}