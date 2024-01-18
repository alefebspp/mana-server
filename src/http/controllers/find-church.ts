import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeFindChurchUseCase } from '@/use-cases/factories/make-find-church-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

type Request = FastifyRequest<{
  Params: {churchId: string}
}>

export async function findChurch(request:Request, reply: FastifyReply){

  const {churchId} = request.params

  try {
    const findChurchUseCase = makeFindChurchUseCase()
    const {church} = await findChurchUseCase.execute(churchId)

    return reply.status(200).send({...church})
  } catch (error) {
    if(error instanceof ResourceNotFoundError){
      return reply.status(400).send({error: error.message})
    }

    throw error
  }
}


