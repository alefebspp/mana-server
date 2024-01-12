import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository'
import { UpdateCategoryUseCase} from '@/use-cases/categories/update/update-category-use-case'

export function makeUpdateCategoryUseCase() {
  const categoriesRepository = new PrismaCategoriesRepository()
  const updateCategoryUseCase = new UpdateCategoryUseCase(categoriesRepository)
  return updateCategoryUseCase
}