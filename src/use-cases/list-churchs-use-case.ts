import { ChurchsRepository } from '@/repositories/churchs-repository'

interface ListChurchsUseCaseParams {
  userId: string
}

export class ListChurchsUseCase {

  constructor(private churchsRepository: ChurchsRepository){}

  async execute({userId}: ListChurchsUseCaseParams) {
    const churchs = await this.churchsRepository.list(userId)

    return {churchs}
  }
}