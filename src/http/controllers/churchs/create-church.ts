import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreateChurchUseCase } from '@/use-cases/factories/church/make-create-church-use-case'
import { z } from 'zod'


export async function createChurch(request: FastifyRequest, reply: FastifyReply){

  const createChurchBodySchema = z.object({
    name: z.string(),
    leader: z.string(),
    email: z.string().email(),
    cnpj: z.string(),
    user_id: z.string().uuid()
  })

  const data = createChurchBodySchema.parse(request.body)

  try {
    const createChruchUseCase = makeCreateChurchUseCase()
    await createChruchUseCase.execute(data)

    return reply.status(201).send()
  } catch (error) {
    throw error
  }
}