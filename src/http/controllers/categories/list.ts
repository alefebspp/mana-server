import { FastifyReply, FastifyRequest } from 'fastify'
import { makeListCategoriesUseCase } from '@/use-cases/factories/categories/make-list-categories-use-case'

type Request = FastifyRequest<{
  Querystring: {belongs_to: string, hidden: boolean}
}>

export async function listCategories(request: Request, reply: FastifyReply){

  const {belongs_to, hidden} = request.query

  try {
    const listCategoriesUseCase = makeListCategoriesUseCase()
    const categories = await listCategoriesUseCase.execute(belongs_to, hidden)
    return reply.status(200).send(categories)

  } catch (error) {
    throw error
  }
}