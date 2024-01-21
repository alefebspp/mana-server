import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'


export class GetUseProfileUseCase{
  constructor(private usersRepository: UsersRepository){}

  async execute(user_id: string){
    
    const user = await this.usersRepository.findById(user_id)

    if(!user){
      throw new ResourceNotFoundError()
    }

    return {user}
  }
}