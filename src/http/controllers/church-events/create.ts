import { makeCreateChurchEventUseCase } from '@/use-cases/factories/church-events/make-create-church-event-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function createChurchEvent(request: FastifyRequest, reply: FastifyReply) {
  const createChurchEventBodySchema = z.object({
    name: z.string(),
    week_day: z.number(),
    hour: z.string(),
    church_id: z.string()
  })

  const data = createChurchEventBodySchema.parse(request.body)

  try {
    const createChurchEventUseCase = makeCreateChurchEventUseCase()
    await createChurchEventUseCase.execute(data)

    return reply.status(201).send()

  } catch (error) {
    throw error
  }
}