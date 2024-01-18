import { FastifyInstance } from 'fastify'
import { createChurch } from '../controllers/create-church'
import { listChurchs } from '../controllers/list-churchs'
import { findChurch } from '../controllers/find-church'
import { updateChurch } from '../controllers/update-church'

export async function churchRoutes(app: FastifyInstance) {
  app.post('/', createChurch)
  app.get('/', listChurchs)
  app.get('/:churchId', findChurch)
  app.patch('/:churchId', updateChurch)
}