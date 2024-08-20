import { EntityRepository, Repository } from 'typeorm';
import Preco_Posto from '../entities/Preco_Posto';

@EntityRepository(Preco_Posto)
export class PrecoPostoRepository extends Repository<Preco_Posto> {
  public async findByPostoId(id_posto: string): Promise<any[]> {
    const query = `
      SELECT  po.nome,
        CONCAT(en.rua, ', ', en.bairro) AS endereco,
        CONCAT(en.cidade, ' - ', en.estado) AS municipio,
        tp.descricao,
        pr.preco,
        po.imagem,
        pl.nome as plano
      FROM posto po
      INNER JOIN endereco en ON po.fk_id_endereco = en.id_endereco
      INNER JOIN preco_posto pr ON pr.fk_id_posto = po.id_posto
      INNER JOIN tipo_combustivel tp ON tp.id_combustivel = pr.fk_id_combustivel
      INNER JOIN planos pl on (pl.id_plano = po.fk_id_plano)
      where pr.fk_id_posto = $1;
    `;

    const result = await this.query(query, [id_posto]);

    return result;
  }
}
