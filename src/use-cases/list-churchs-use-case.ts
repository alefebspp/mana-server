import { ChurchsRepository } from '@/repositories/churchs-repository'


export class ListChurchsUseCase {

  constructor(private churchsRepository: ChurchsRepository){}

  async execute() {
    const churchs = await this.churchsRepository.list()

    return {churchs}
  }
}