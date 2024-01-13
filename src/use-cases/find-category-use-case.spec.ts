import {it, describe, expect, beforeAll} from 'vitest'
import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository'
import { FindCategoryUseCase } from './find-category-use-case'
import { CategoryNotFoundError } from './errors/category-not-found-error'

let categoriesRepository: InMemoryCategoriesRepository
let sut: FindCategoryUseCase

beforeAll(async () => {
  categoriesRepository = new InMemoryCategoriesRepository()
  sut = new FindCategoryUseCase(categoriesRepository)

  await categoriesRepository.create({
    description: 'Receitas',
    nature: 'contribution',
    belongs_to: null,
    code: '1'      
  })
})

describe('Find Category Use Case', () => {

  it('should return category with the informed id', async() => {
    const { category } = await sut.execute(categoriesRepository.categories[0].id)

    expect(category).toBeTruthy()
  })

  it('should throw if category is not found', async() => {

    expect(async () => await sut.execute('')).rejects.toBeInstanceOf(CategoryNotFoundError)
  })
})