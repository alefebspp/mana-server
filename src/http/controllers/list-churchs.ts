import { makeListChurchsUseCase } from '@/use-cases/factories/make-list-churchrs-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'



export async function listChurchs(request: FastifyRequest, reply: FastifyReply) {

  try {
    const listChurchsUseCase = makeListChurchsUseCase()
    const {churchs} = await listChurchsUseCase.execute()

    return reply.status(200).send({data: churchs})
  } catch (error) {
    throw error
  }
}