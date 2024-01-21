import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeUpdateChurchUseCase } from '@/use-cases/factories/church/make-update-church-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

type Request = FastifyRequest<{
  Params: {churchId: string}
}>

export async function updateChurch(request: Request, reply: FastifyReply){

  const updateChurchBodySchema = z.object({
    name: z.string().optional(),
    leader: z.string().optional(),
    email: z.string().email().optional(),
    cnpj: z.string().optional(),
    user_id: z.string().uuid().optional()
  })

  const data = updateChurchBodySchema.parse(request.body)
  const {churchId} = request.params

  try {
    const updateChruchUseCase = makeUpdateChurchUseCase()
    await updateChruchUseCase.execute({data, church_id: churchId})

    return reply.status(200).send()
  } catch (error) {
    if(error instanceof ResourceNotFoundError){
      return reply.status(400).send({error: error.message})
    }

    throw error
  }
}