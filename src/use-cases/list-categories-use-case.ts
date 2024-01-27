import { CategoriesRepository, ListCategoryRequest } from '@/repositories/categories-repository'


export class ListCategoriesUseCase {

  constructor(private categoriesRepository: CategoriesRepository){}

  async execute({belongs_to, hidden, userId}: ListCategoryRequest){
    const categories = await this.categoriesRepository.list({belongs_to, hidden, userId})

    return categories
  }
}