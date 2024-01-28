import { ChurchEventsRepository } from '@/repositories/church-events-repository'

export class ListChurchEventsUseCase {
  constructor(private churchEventsRepository: ChurchEventsRepository){}

  async execute(churchId: string) {

    const events = await this.churchEventsRepository.list(churchId)

    return {events}
  }
}