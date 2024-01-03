import { CategoriesRepository } from '@/repositories/categories-repository'


export class ListCategoriesUseCae {

  constructor(private categoriesRepository: CategoriesRepository){}

  async execute(belongs_to?: string){
    const categories = await this.categoriesRepository.list(belongs_to)

    return categories
  }
}