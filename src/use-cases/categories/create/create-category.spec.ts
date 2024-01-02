import {expect, it, describe} from 'vitest'
import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository'
import { CreateCategoryUseCase } from '.'

describe('Create Category Use Case', () => {

  it('should create a code automatically upon creation', async () => {
    const categoriesRepository = new InMemoryCategoriesRepository()
    const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)

    const baseCategory = {
      description: 'Receitas',
      nature: 'contribution',
      belongs_to: null,      
    }

    await createCategoryUseCase.execute(baseCategory)
    expect(categoriesRepository.categories[0].code).toEqual('1')
  })

  it('should create a dynamic code for children categories', async () => {
    const categoriesRepository = new InMemoryCategoriesRepository()
    const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)

    const baseCategory = {
      description: 'Receitas',
      nature: 'contribution',
      belongs_to: null,      
    }

    await createCategoryUseCase.execute(baseCategory)

    const childCategory = {
      description: 'Receitas extras',
      nature: 'contribution',
      belongs_to: categoriesRepository.categories[0].id,      
    }

    await createCategoryUseCase.execute(childCategory)

    const childOfChildCategory = {
      description: 'Receitas extras filho',
      nature: 'contribution',
      belongs_to: categoriesRepository.categories[1].id, 
    }

    await createCategoryUseCase.execute(childOfChildCategory)

    expect(categoriesRepository.categories[1].code).toEqual('1.1')
    expect(categoriesRepository.categories[2].code).toEqual('1.1.1')
  })
})