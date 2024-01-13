import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository'
import { CreateCategoryUseCase } from '@/use-cases/create-category-use-case'


export function makeCreateCategoryUseCase(){
  const categoriesRepository = new PrismaCategoriesRepository()
  const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)

  return createCategoryUseCase
}