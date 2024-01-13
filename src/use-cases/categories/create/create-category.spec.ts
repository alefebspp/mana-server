import {expect, it, describe, beforeEach} from 'vitest'
import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository'
import { CreateCategoryUseCase } from '.'

let categoriesRepository: InMemoryCategoriesRepository
let sut: CreateCategoryUseCase

describe('Create Category Use Case', () => {

  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new CreateCategoryUseCase(categoriesRepository)
  })

  it('should create a code automatically upon creation', async () => {
    const baseCategory = {
      description: 'Receitas',
      nature: 'contribution',
      belongs_to: null,      
    }

    await sut.execute(baseCategory)
    expect(categoriesRepository.categories[0].code).toEqual('1')
  })

  it('should create a dynamic code for children categories', async () => {
    const baseCategory = {
      description: 'Receitas',
      nature: 'contribution',
      belongs_to: null,      
    }

    await sut.execute(baseCategory)

    const childCategory = {
      description: 'Receitas extras',
      nature: 'contribution',
      belongs_to: categoriesRepository.categories[0].id,      
    }

    await sut.execute(childCategory)

    const childOfChildCategory = {
      description: 'Receitas extras filho',
      nature: 'contribution',
      belongs_to: categoriesRepository.categories[1].id, 
    }

    await sut.execute(childOfChildCategory)

    expect(categoriesRepository.categories[1].code).toEqual('1.1')
    expect(categoriesRepository.categories[2].code).toEqual('1.1.1')
  })
})