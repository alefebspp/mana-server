import {it, describe, expect, beforeAll} from 'vitest'
import { HideCategoryUseCase } from './hide-category-use-case'
import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository'
import { CategoryNotFoundError } from '../errors/category-not-found-error'


let categoriesRepository: InMemoryCategoriesRepository
let sut: HideCategoryUseCase

beforeAll(() => {
  categoriesRepository = new InMemoryCategoriesRepository()
  sut = new HideCategoryUseCase(categoriesRepository)
})

describe('Hide Category Use Case', () => {

  it('should properly hide a category', async() => {
    const newCategory = {
      description: 'Receitas',
      nature: 'contribution',
      belongs_to: null,
      code: '1'      
    }

    await categoriesRepository.create(newCategory)
    const category = categoriesRepository.categories[0]
    
    expect(category.hidden).toBe(false)

    await sut.execute(category.id)

    expect(category.hidden).toBe(true)
  })

  it('should throw if category is not found', async() => {

    expect(async () => await sut.execute('')).rejects.toBeInstanceOf(CategoryNotFoundError)
  })
})