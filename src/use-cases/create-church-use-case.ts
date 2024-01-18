import { ChurchsRepository } from '@/repositories/churchs-repository'

interface CreateChurchRequest {
  name: string;
  leader: string;
  email:  string;
  cnpj:   string;
  user_id: string; 
}

export class CreateChurchUseCase {

  constructor(private churchsRepository: ChurchsRepository){}

  async execute(data: CreateChurchRequest){
    await this.churchsRepository.create(data)
  }
}