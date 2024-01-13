import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateCategoryUseCase } from '@/use-cases/factories/categories/make-create-category-use-case'


export async function createCategory(request: FastifyRequest, reply: FastifyReply) {
  const createCategoryBodySchema = z.object({
    description: z.string(),
    nature: z.enum(['expense', 'contribution']),
    belongs_to: z.string().nullable()
  })

  const data = createCategoryBodySchema.parse(request.body)
  
  try {
    const createCategoryUseCase = makeCreateCategoryUseCase()
    await createCategoryUseCase.execute(data)
  } catch (error) {
    throw error
  }

  return reply.status(201).send()
}