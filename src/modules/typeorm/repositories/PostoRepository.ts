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

  public async findByTipoCombustivel(tipoCombustivelId: string): Promise<any[]> {
    const query = `
      SELECT  po.id_posto, po.nome,
        CONCAT(en.rua, ', ', en.bairro) AS endereco,
        CONCAT(en.cidade, ' - ', en.estado) AS municipio,
        tp.descricao,
        po.data_atualizacao AS atualizacao,
        pr.preco,
        po.imagem,
        po.fk_id_plano
      FROM posto po
      INNER JOIN endereco en ON po.fk_id_endereco = en.id_endereco
      INNER JOIN preco_posto pr ON pr.fk_id_posto = po.id_posto
      INNER JOIN tipo_combustivel tp ON tp.id_combustivel = pr.fk_id_combustivel
      where pr.fk_id_combustivel = $1
      order by po.fk_id_plano desc, pr.preco asc;
    `;

    const result = await this.query(query, [tipoCombustivelId]);

    return result;
  }
}

export default PostoRepository;
