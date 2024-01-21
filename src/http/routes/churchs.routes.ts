import { FastifyInstance } from 'fastify'
import { createChurch } from '../controllers/churchs/create-church'
import { listChurchs } from '../controllers/churchs/list-churchs'
import { findChurch } from '../controllers/churchs/find-church'
import { updateChurch } from '../controllers/churchs/update-church'

export async function churchRoutes(app: FastifyInstance) {
  app.post('/', createChurch)
  app.get('/', listChurchs)
  app.get('/:churchId', findChurch)
  app.patch('/:churchId', updateChurch)
}