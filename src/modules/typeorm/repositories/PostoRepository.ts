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

  public async findByTipoCombustivel(tipoCombustivelId: number): Promise<any[]> {
    const query = `
      WITH LatestPreco AS (
        SELECT 
          pr.fk_id_posto,
          pr.fk_id_combustivel,
          MAX(pr.data_postagem) AS max_data_postagem
        FROM preco_posto pr
        GROUP BY pr.fk_id_posto, pr.fk_id_combustivel
      )
      SELECT 
        po.nome,
        CONCAT(en.rua, ', ', en.bairro) AS endereco,
        CONCAT(en.cidade, ' - ', en.estado) AS municipio,
        tp.descricao,
        pr.data_postagem AS atualizacao
      FROM posto po
      INNER JOIN endereco en ON po.fk_id_endereco = en.id_endereco
      INNER JOIN preco_posto pr ON pr.fk_id_posto = po.id_posto
      INNER JOIN tipo_combustivel tp ON tp.id_combustivel = pr.fk_id_combustivel
      INNER JOIN LatestPreco lp
        ON pr.fk_id_posto = lp.fk_id_posto
        AND pr.fk_id_combustivel = lp.fk_id_combustivel
        AND pr.data_postagem = lp.max_data_postagem
      WHERE tp.id_combustivel = $1
      ORDER BY pr.preco ASC;
    `;

    const result = await this.query(query, [tipoCombustivelId]);

    return result;
  }
}

export default PostoRepository;
