import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/middlewares/verify-jwt'
import { createChurchEvent } from '../controllers/church-events/create'
import { listChurchEvents } from '../controllers/church-events/list'


export async function churchEventsRoutes(app: FastifyInstance){
  app.addHook('preHandler', verifyJWT)

  app.post('/', createChurchEvent)
  app.get('/:churchId', listChurchEvents)
}