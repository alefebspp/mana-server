import { ChurchsRepository } from '@/repositories/churchs-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'


export class FindChurchUseCase{
  constructor(private churchsRepository: ChurchsRepository){}

  async execute(church_id: string) {
    const church = await this.churchsRepository.find(church_id)

    if(!church){
      throw new ResourceNotFoundError()
    }

    return {
      church
    }
  }
}