import { Category, Prisma } from '@prisma/client'

export interface CategoriesRepository {
  create(data: Prisma.CategoryCreateInput): Promise<void>;
  list(parentCategoryId?: string): Promise<Category[]>
  hide(id: string): Promise<void>
  find(id: string): Promise<Category | null>
}