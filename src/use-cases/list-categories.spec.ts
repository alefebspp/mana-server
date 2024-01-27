import {describe, beforeEach, it, expect} from 'vitest'
import { ListCategoriesUseCase } from './list-categories-use-case'
import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository'

let categoriesRepository: InMemoryCategoriesRepository
let sut: ListCategoriesUseCase

describe('List Categories Use Case', () => {

  beforeEach(async () => {
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new ListCategoriesUseCase(categoriesRepository)

    await categoriesRepository.create({description: 'Receitas', code: '1', nature: 'contribution', user_id: 'fake-id'})
    await categoriesRepository.create({description: 'Despesas', code: '2', nature: 'expense', user_id: 'fake-id'})
  })

  it('should list all categories', async () => {
    const categories = await sut.execute({userId: 'fake-id'})

    expect(categories.length).toBe(2)
  })
  it('should filter parent and children categories if belongs_to param is passed', async () => {
    const categories = await sut.execute({userId: 'fake-id'})

    const parentId = categories[1].id

    await categoriesRepository.create({description: 'Despesas extras', code: '2.1', nature: 'expense', belongs_to: parentId})

    const filteredCategories = await sut.execute({userId: 'fake-id', belongs_to: parentId})

    expect(filteredCategories).toEqual([
      expect.objectContaining({code: '2'}),
      expect.objectContaining({code: '2.1'})
    ])
  })

  it('should filter for hidden categories if hidden param is defined', async () => {
    await categoriesRepository.create({description: 'Receitas Extras', code: '3', nature: 'contribution', hidden: true})
    await categoriesRepository.create({description: 'Despesas Extras', code: '4', nature: 'expense', hidden: true})

    const categories = await sut.execute({userId: 'fake-id', hidden: true})

    const allCategoriesAreHidden = categories.every(category => category.hidden == true)

    expect(allCategoriesAreHidden).toBe(true)
  })

})