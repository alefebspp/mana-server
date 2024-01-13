import { makeUpdateCategoryUseCase } from '@/use-cases/factories/categories/make-update-category-use-case'
import { CategoryNotFoundError } from '@/use-cases/errors/category-not-found-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

type Request = FastifyRequest<{
  Params: {categoryId: string}
}>

export async function updateCategory(request: Request, reply: FastifyReply) {

  const updateCategoryBodySchema = z.object({
    description: z.string().optional(),
    nature: z.enum(['expense', 'contribution']).optional(),
    belongs_to: z.string().optional(),
    hidden: z.boolean().optional()
  })
 
  const data = updateCategoryBodySchema.parse(request.body)
  const {categoryId} = request.params

  try {
    const updateCategoryUseCase = makeUpdateCategoryUseCase()
    await updateCategoryUseCase.execute(categoryId, data)
  } catch (error) {
    if(error instanceof CategoryNotFoundError){
      return reply.status(400).send({message: error.message})
    }
  }

}