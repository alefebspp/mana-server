import { ChurchEventsRepository } from '@/repositories/church-events-repository'

interface CreateChurchEventParams {
  name:string;
  week_day: number;
  hour: string;
  church_id: string
}

export class CreateChurchEventUseCase {
  constructor(private churchEventsRepository: ChurchEventsRepository){}

  async execute(data: CreateChurchEventParams){
    await this.churchEventsRepository.create(data)
  }
}