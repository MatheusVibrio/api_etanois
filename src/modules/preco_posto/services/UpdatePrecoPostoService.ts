import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Preco_Posto from '@modules/typeorm/entities/Preco_Posto';
import PostoRepository from '@modules/typeorm/repositories/PostoRepository';
import { PrecoPostoRepository } from '@modules/typeorm/repositories/PrecoPostoRepository';
import TipoCombustivelRepository from '@modules/typeorm/repositories/TipoCombustivelRepository';

interface IRequest {
  preco: number;
  fk_id_posto: number;
  fk_id_combustivel: number;
}

class UpdatePrecoPostoService {
  public async execute({ preco, fk_id_posto, fk_id_combustivel }: IRequest): Promise<Preco_Posto> {
    const precoPostoRepository = getCustomRepository(PrecoPostoRepository);
    const postoRepository = getCustomRepository(PostoRepository); // Supondo que você tenha um repositório para Posto
    const tipoCombustivelRepository = getCustomRepository(TipoCombustivelRepository); // Supondo que você tenha um repositório para Tipo_Combustivel

    // Encontra o posto e tipo de combustível
    const posto = await postoRepository.findOne(fk_id_posto);
    const tipoCombustivel = await tipoCombustivelRepository.findOne(fk_id_combustivel);

    if (!posto || !tipoCombustivel) {
      throw new Error('Posto ou Tipo de Combustível não encontrado');
    }

    // Tenta encontrar o registro existente
    let precoPosto = await precoPostoRepository.findOne({
      where: { fk_id_posto, fk_id_combustivel },
    });

    if (!precoPosto) {
      // Cria um novo registro se não existir
      precoPosto = precoPostoRepository.create({
        preco,
        fk_id_posto: posto, // Atribui o objeto Posto
        fk_id_combustivel: tipoCombustivel, // Atribui o objeto Tipo_Combustivel
      });
    } else {
      // Atualiza o registro existente
      precoPosto.preco = preco;
      // Atualiza relacionamentos se necessário
      precoPosto.fk_id_posto = posto;
      precoPosto.fk_id_combustivel = tipoCombustivel;
    }

    await precoPostoRepository.save(precoPosto);

    return precoPosto;
  }
}

export default UpdatePrecoPostoService;
