import { CategoriesRepository } from '@/repositories/categories-repository'
import { CategoryNotFoundError } from '../errors/category-not-found-error'

export class FindCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository){}

  async execute(id: string) {
    const category = await this.categoriesRepository.find(id)

    if(!category){
      throw new CategoryNotFoundError()
    }

    return  { category }
  }
}