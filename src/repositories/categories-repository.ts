import { Category, Prisma } from '@prisma/client'

export interface ListCategoryRequest {
  belongs_to?: string; 
  hidden?: boolean;
  userId: string;
}
export interface CategoriesRepository {
  create(data: Prisma.CategoryCreateInput): Promise<void>;
  list(params: ListCategoryRequest): Promise<Category[]>
  find(id: string): Promise<Category | null>
  update(id: string, data: Omit<Prisma.CategoryUpdateInput, 'id'>): Promise<void>
}