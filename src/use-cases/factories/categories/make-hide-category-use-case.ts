import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository'
import { HideCategoryUseCase } from '@/use-cases/categories/hide-category/hide-category-use-case'

export function makeHideCategoryUseCase() {
  const categoriesRepository = new PrismaCategoriesRepository()
  const hideCategoryUseCase = new HideCategoryUseCase(categoriesRepository)
  return hideCategoryUseCase
}