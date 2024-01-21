import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import {FastifyRequest, FastifyReply} from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  
  try {
    const userId = request.user.sub

    const getUserProfileUseCase = makeGetUserProfileUseCase()

    const {user} = await getUserProfileUseCase.execute(userId)

    return reply.status(200).send({...user, password_hash: undefined})
  
  } catch (error) {
    throw error
  }
}