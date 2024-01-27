import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreateChurchUseCase } from '@/use-cases/factories/church/make-create-church-use-case'
import { z } from 'zod'


export async function createChurch(request: FastifyRequest, reply: FastifyReply){

  const createChurchBodySchema = z.object({
    name: z.string(),
    leader: z.string(),
    email: z.string().email(),
    cnpj: z.string(),
  })

  const data = createChurchBodySchema.parse(request.body)
  const user_id = request.user.sub

  try {
    const createChruchUseCase = makeCreateChurchUseCase()
    await createChruchUseCase.execute({...data, user_id})

    return reply.status(201).send()
  } catch (error) {
    throw error
  }
}