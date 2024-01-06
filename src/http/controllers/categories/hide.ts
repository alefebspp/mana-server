import { CategoryNotFoundError } from '@/use-cases/categories/errors/category-not-found-error'
import { makeHideCategoryUseCase } from '@/use-cases/factories/categories/make-hide-category-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function hideCategory(request: FastifyRequest, reply: FastifyReply) {

  const hideCategoryBodySchema = z.object({
    category_id: z.string()
  })

  const data = hideCategoryBodySchema.parse(request.body)

  try {
    const hideCategoryUseCase = makeHideCategoryUseCase()
    await hideCategoryUseCase.execute(data.category_id)
  } catch (error) {
    if(error instanceof CategoryNotFoundError){
      return reply.status(400).send({message: error.message})
    }
  }

  return reply.status(200).send()

}