import { EntityRepository, Repository } from 'typeorm';
import Preco_Posto from '../entities/Preco_Posto';

@EntityRepository(Preco_Posto)
export class PrecoPostoRepository extends Repository<Preco_Posto> {
  public async findByPostoId(id_posto: string): Promise<any[]> {
    const query = this.createQueryBuilder('pr')
      .select([
                'pr.preco AS preco',
                'po.nome AS Posto',
                'tp.descricao AS Combustivel',
                'pr.data_postagem AS Atualizacao',
                `concat(en.rua, ', ', en.bairro) AS endereco`,
                `concat(en.cidade, ' - ', en.estado) AS municipio`,
            ])
      .innerJoin('pr.fk_id_posto', 'po')
      .innerJoin('pr.fk_id_combustivel', 'tp')
       .innerJoin('endereco', 'en', 'po.fk_id_endereco = en.id_endereco')
      .innerJoin(
        subQuery => {
          return subQuery
            .select('pr.fk_id_posto')
            .addSelect('pr.fk_id_combustivel')
            .addSelect('MAX(pr.data_postagem)', 'max_data_postagem')
            .from(Preco_Posto, 'pr')
            .groupBy('pr.fk_id_posto')
            .addGroupBy('pr.fk_id_combustivel');
        },
        'latest',
        'pr.fk_id_posto = latest.fk_id_posto AND pr.fk_id_combustivel = latest.fk_id_combustivel AND pr.data_postagem = latest.max_data_postagem'
      )
      .where('po.id_posto = :id_posto', { id_posto })
      .orderBy('po.nome', 'ASC')
      .addOrderBy('tp.descricao', 'ASC');

    const precos = await query.getRawMany();

    return precos;
  }
}
