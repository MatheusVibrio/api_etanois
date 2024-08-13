import { EntityRepository, Repository } from "typeorm";
import Endereco from "../entities/Endereco";

@EntityRepository(Endereco)
class EnderecoRepository extends Repository<Endereco>{
  public async findByEndereco(id_endereco: string): Promise<Endereco | undefined> {
    const endereco = await this.findOne({
      where: {
        id_endereco,
      },
    });

    return endereco;
  }

}

export default EnderecoRepository;
