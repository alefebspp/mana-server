import { CategoriesRepository } from '@/repositories/categories-repository'

interface CreateCategoryRequest {
  description: string;
  nature: string;
  belongs_to: string | null;
  user_id: string;
}

export class CreateCategoryUseCase{

  constructor(private categoriesRepository: CategoriesRepository){}


  async execute(data: CreateCategoryRequest){
    const categories = await this.categoriesRepository.list({userId: data.user_id, belongs_to: data.belongs_to ?? undefined})
    
    const lastCode = categories[categories.length - 1]?.code

    let categoryCode: string = lastCode ? String(parseInt(lastCode) + 1) : '1'

    if(data.belongs_to){
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
    }

    await this.categoriesRepository.create({
      ...data,
      code: categoryCode
    })
  }
}