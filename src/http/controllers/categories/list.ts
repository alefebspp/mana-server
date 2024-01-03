import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository'
import { ListCategoriesUseCae } from '@/use-cases/categories/list'

type Request = FastifyRequest<{
  Querystring: {belongs_to: string}
}>

export async function listCategories(request: Request, reply: FastifyReply){

  const {belongs_to} = request.query

  try {
    const categoriesRepository = new PrismaCategoriesRepository()
    const listCategoriesUseCase = new ListCategoriesUseCae(categoriesRepository)
    const categories = await listCategoriesUseCase.execute(belongs_to)
    return reply.status(200).send(categories)

  } catch (error) {
    throw error
  }
}