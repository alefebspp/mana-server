import { CategoryNotFoundError } from '@/use-cases/errors/category-not-found-error'
import { makeFindCategoryUseCase } from '@/use-cases/factories/categories/make-find-category-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

type Request = FastifyRequest<{
  Params: {categoryId: string}
}>

export async function findCategory(request: Request, reply: FastifyReply) {

  const {categoryId} = request.params

  try {
    const findCategoryUseCase = makeFindCategoryUseCase()
    const {category} = await findCategoryUseCase.execute(categoryId)
    
    return reply.status(200).send(category)
  } catch (error) {
    if(error instanceof CategoryNotFoundError){
      return reply.status(400).send({message: error.message})
    }
  }
}