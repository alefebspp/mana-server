import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository'
import { FindCategoryUseCase } from '@/use-cases/find-category-use-case'

export function makeFindCategoryUseCase() {
  const categoriesRepository = new PrismaCategoriesRepository()
  const findCategoryUseCase = new FindCategoryUseCase(categoriesRepository)
  return findCategoryUseCase
}