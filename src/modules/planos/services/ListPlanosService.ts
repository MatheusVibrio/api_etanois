import Plano from "@modules/typeorm/entities/Planos";
import PlanosRepository from "@modules/typeorm/repositories/PlanosRepository";
import { getCustomRepository } from 'typeorm';

class ListPlanosService {
  public async execute(): Promise<Plano[]> {
    const planosRepository = getCustomRepository(PlanosRepository);
    
    const planos = await planosRepository.find({
      order: {
        id_plano: 'ASC',
      },
    });

    return planos;
  }
}

export default ListPlanosService;
