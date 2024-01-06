import { authenticate } from './controllers/authenticate'
import { createCategory } from './controllers/categories/create'
import { findCategory } from './controllers/categories/find'
import { hideCategory } from './controllers/categories/hide'
import { listCategories } from './controllers/categories/list'
import { register } from './controllers/register'
import { FastifyInstance } from 'fastify'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.post('/categories', createCategory)
  app.post('/categories/hide', hideCategory)
  app.get('/categories', listCategories)
  app.get('/categories/:categoryId', findCategory)
}


