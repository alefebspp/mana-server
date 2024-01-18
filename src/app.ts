import fastify from 'fastify'
import cors from '@fastify/cors'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'
import { churchRoutes } from './http/routes/churchs.routes'

export const app = fastify()

app.register(appRoutes)
app.register(churchRoutes, {prefix: 'churchs'})

app.register(cors, { 
  origin: '*'
})


app.setErrorHandler((error, _, reply) => {
  if(error instanceof ZodError){
    return reply.status(400).send({message: 'Validation error.', issues: error.format()})
  }

  if(env.NODE_ENV !== 'production'){
    console.log(error)
  } else{
    //TODO log to external tool 
  }

  return reply.status(500).send({message: 'Internal server error.'})
})