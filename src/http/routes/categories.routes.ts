import { FastifyInstance } from 'fastify'
import { createCategory } from '../controllers/categories/create'
import { findCategory } from '../controllers/categories/find'
import { listCategories } from '../controllers/categories/list'
import { updateCategory } from '../controllers/categories/update'
import { verifyJWT } from '@/middlewares/verify-jwt'



export async function categoriesRoutes(app: FastifyInstance) {
  app.addHook('preHandler', verifyJWT)

  app.post('/', createCategory)
  app.get('/', listCategories)
  app.get('/:categoryId', findCategory)
  app.patch('/update/:categoryId', updateCategory)
}