
import {expect, it, describe, beforeEach} from 'vitest'
import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository'
import { UpdateCategoryUseCase } from './update-category-use-case'
import { CategoryNotFoundError } from './errors/category-not-found-error'

let categoriesRepository: InMemoryCategoriesRepository
let sut: UpdateCategoryUseCase

describe('Update Category Use Case', () => {

  beforeEach(async() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new UpdateCategoryUseCase(categoriesRepository)
    
    await categoriesRepository.create({
      description: 'Receitas',
      nature: 'contribution',
      belongs_to: null,
      code: '1'  
    })
  })

  it('Should properly update a category', async () => {

    const category = categoriesRepository.categories[0]

    expect(category.description).toBe('Receitas')
    await sut.execute(category.id, {description: 'Receitas atualizadas'})
    expect(category.description).toBe('Receitas atualizadas')

  })

  it('Should throw if category is not found', async() =>{

    expect(async () => await sut.execute('wrong-id', {})).rejects.toBeInstanceOf(CategoryNotFoundError)
  })


})