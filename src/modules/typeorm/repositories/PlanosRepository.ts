import { EntityRepository, Repository } from "typeorm";
import Planos from "../entities/Planos";

@EntityRepository(Planos)
class PlanosRepository extends Repository<Planos>{
  public async findById(id_plano: number): Promise<Planos | undefined> {
    const plano = await this.findOne({
      where: {
        id_plano,
      },
    });

    return plano;
  }

}

export default PlanosRepository;
