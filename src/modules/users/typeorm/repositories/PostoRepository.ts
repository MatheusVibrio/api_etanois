import { EntityRepository, Repository } from "typeorm";
import Posto from "../entities/Posto";

@EntityRepository(Posto)
class PostoRepository extends Repository<Posto>{
  public async findByName(nome: string): Promise<Posto | undefined> {
    const user = await this.findOne({
      where: {
        nome,
      },
    });

    return user;
  }

  public async findByid(id_posto: string): Promise<Posto | undefined> {
    const posto = await this.findOne({
      where: {
        id_posto,
      },
    });

    return posto;
  }

  public async findByCnpj(cnpj: string): Promise<Posto | undefined> {
    const posto = await this.findOne({
      where: {
        cnpj,
      },
    });

    return posto;
  }
}

export default PostoRepository;
