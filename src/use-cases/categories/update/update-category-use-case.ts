import { CategoriesRepository } from '@/repositories/categories-repository'
import { Prisma } from '@prisma/client'
import { CategoryNotFoundError } from '../errors/category-not-found-error'


export class UpdateCategoryUseCase {

  constructor(private categoriesRepository: CategoriesRepository){}

  async execute(id: string, data: Omit<Prisma.CategoryUpdateInput, 'id'>){

    const category = await this.categoriesRepository.find(id)

    if(!category){
      throw new CategoryNotFoundError()
    }

    if(data.belongs_to){
      const belongs_to = data.belongs_to as string | undefined
      const categories = await this.categoriesRepository.list(belongs_to)
    
      const lastCode = categories[categories.length - 1]?.code
  
      let categoryCode: string = lastCode ? String(parseInt(lastCode) + 1) : '1'
  
      if(categories.length == 1){
        categoryCode = `${lastCode.toLocaleString()}.${1}`
      }
  
      if ( categories.length > 1) {
        const splitCode = lastCode.toLocaleString().split('.')
        const splitLastCode = parseInt(splitCode[splitCode.length - 1])
        splitCode.pop()
        splitCode.push(String(splitLastCode + 1))
        categoryCode = splitCode.join('.')
      }

      await this.categoriesRepository.update(id, {
        ...data,
        code: categoryCode
      })
    }
    

    await this.categoriesRepository.update(id, data)
  }
}