import { Category, Prisma } from '@prisma/client'

export interface CategoriesRepository {
  create(data: Prisma.CategoryCreateInput): Promise<void>;
  list(parentCategoryId?: string): Promise<Category[]>
}