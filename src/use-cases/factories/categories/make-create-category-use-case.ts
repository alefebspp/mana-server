import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository'
import { CreateCategoryUseCase } from '@/use-cases/categories/create'


export function makeCreateCategoryUseCase(){
  const categoriesRepository = new PrismaCategoriesRepository()
  const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)

  return createCategoryUseCase
}