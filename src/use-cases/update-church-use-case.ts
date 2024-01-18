import { ChurchsRepository } from '@/repositories/churchs-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface UpdateChurchRequest {
  name?:  string
  leader?:  string
  email?:  string
  cnpj?:  string
  user_id?: string; 
}

interface UpdateChurchParams {
  church_id: string;
  data: UpdateChurchRequest
}

export class UpdateChurchUseCase {

  constructor(private churchsRepository: ChurchsRepository){}

  async execute({data, church_id}: UpdateChurchParams){

    const churchExists = await this.churchsRepository.find(church_id)

    if(!churchExists){
      throw new ResourceNotFoundError()
    }
    
    await this.churchsRepository.update(data, church_id)
  }
}