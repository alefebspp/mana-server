import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository'
import { CreateCategoryUseCase } from '@/use-cases/categories/create'


export async function createCategory(request: FastifyRequest, reply: FastifyReply) {
  const createCategoryBodySchema = z.object({
    description: z.string(),
    nature: z.enum(['expense', 'contribution']),
    belongs_to: z.string().nullable()
  })

  const data = createCategoryBodySchema.parse(request.body)
  
  try {
    const categoriesRepository = new PrismaCategoriesRepository()
    const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)
    await createCategoryUseCase.execute(data)
  } catch (error) {
    throw error
  }

  return reply.status(201).send()
}