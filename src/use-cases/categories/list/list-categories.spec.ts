import {describe, beforeEach, it, expect} from 'vitest'
import { ListCategoriesUseCase } from './list-categories-use-case'
import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository'

let categoriesRepository: InMemoryCategoriesRepository
let sut: ListCategoriesUseCase

describe('List Categories Use Case', () => {

  beforeEach(async () => {
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new ListCategoriesUseCase(categoriesRepository)

    await categoriesRepository.create({description: 'Receitas', code: '1', nature: 'contribution'})
    await categoriesRepository.create({description: 'Despesas', code: '2', nature: 'expense'})
  })

  it('should list all categories', async () => {
    const categories = await sut.execute()

    expect(categories.length).toBe(2)
  })
  it('should filter parent and children categories if belongs_to param is passed', async () => {
    const categories = await sut.execute()

    const parentId = categories[1].id

    await categoriesRepository.create({description: 'Despesas extras', code: '2.1', nature: 'expense', belongs_to: parentId})

    const filteredCategories = await sut.execute(parentId)

    expect(filteredCategories[0].code).toBe('2')
    expect(filteredCategories[1].code).toBe('2.1')
  })

})