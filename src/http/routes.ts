import { verifyJWT } from '@/middlewares/verify-jwt'
import { authenticate } from './controllers/authenticate'
import { createCategory } from './controllers/categories/create'
import { findCategory } from './controllers/categories/find'
import { listCategories } from './controllers/categories/list'
import { updateCategory } from './controllers/categories/update'
import { profile } from './controllers/profile'
import { register } from './controllers/register'
import { FastifyInstance } from 'fastify'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.get('/me', {onRequest: verifyJWT}, profile)
  
  app.post('/categories', createCategory)
  app.get('/categories', listCategories)
  app.get('/categories/:categoryId', findCategory)
  app.patch('/categories/update/:categoryId', updateCategory)
}


