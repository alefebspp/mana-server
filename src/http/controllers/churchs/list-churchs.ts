import { makeListChurchsUseCase } from '@/use-cases/factories/church/make-list-churchrs-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'



export async function listChurchs(request: FastifyRequest, reply: FastifyReply) {

  try {
    const userId = request.user.sub
    const listChurchsUseCase = makeListChurchsUseCase()
    const {churchs} = await listChurchsUseCase.execute({userId})

    return reply.status(200).send({data: churchs})
  } catch (error) {
    throw error
  }
}