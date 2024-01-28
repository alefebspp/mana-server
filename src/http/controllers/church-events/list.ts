import { makeListChurchEventsUseCase } from '@/use-cases/factories/church-events/make-list-church-events-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

type Request = FastifyRequest<{
  Params: {churchId: string}
}>

export async function listChurchEvents(request: Request, reply: FastifyReply){

  const {churchId} = request.params

  try {
    const {events} = await makeListChurchEventsUseCase().execute(churchId)

    return reply.status(200).send({data: events})
  } catch (error) {
    throw error
  }
}