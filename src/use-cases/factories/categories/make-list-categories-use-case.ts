import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository'
import { ListCategoriesUseCae } from '@/use-cases/categories/list/list-categories-use-case'


export function makeListCategoriesUseCase(){
  const categoriesRepository = new PrismaCategoriesRepository()
  const listCategoriesUseCase = new ListCategoriesUseCae(categoriesRepository)

  return listCategoriesUseCase
}