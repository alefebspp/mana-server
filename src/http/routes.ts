import { createCategory } from './controllers/categories/create'
import { listCategories } from './controllers/categories/list'
import { register } from './controllers/register'
import { FastifyInstance } from 'fastify'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/categories', createCategory)
  app.get('/categories', listCategories)
}


