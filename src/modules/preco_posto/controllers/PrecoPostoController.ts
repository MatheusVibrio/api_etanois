import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { PrecoPostoRepository } from '@modules/typeorm/repositories/PrecoPostoRepository';
import UpdatePrecoPostoService from '../services/UpdatePrecoPostoService';
import Preco_Posto from '@modules/typeorm/entities/Preco_Posto';

export class PrecoPostoController {
  public async detalhes(request: Request, response: Response): Promise<Response> {
    const id_posto = request.params.id_posto;

    if (!id_posto) {
      return response.status(400).json({
        status: 'error',
        message: 'É obrigatório informar o id_posto.',
      });
    }

    try {
      const listDetalhes = getCustomRepository(PrecoPostoRepository); // Obtém o repositório customizado
      const detalhes = await listDetalhes.findByPostoId(id_posto); // Exemplo de chamada de serviço

      if (detalhes.length === 0) {
        return response.status(404).json({
          status: 'error',
          message: 'Posto não encontrado.',
        });
      }

      // Inicializa o objeto de resposta com a primeira linha
      const firstItem = detalhes[0];
      const formattedData = {
        posto_id: id_posto,
        nome: firstItem.nome || 'Nome não disponível',
        endereco: firstItem.endereco || 'Endereço não disponível',
        precos: detalhes.reduce((acc, item) => {
          const descricaoNormalizada = item.descricao.toLowerCase().replace(/\s+/g, '_');
          acc[descricaoNormalizada] = parseFloat(item.preco);
          return acc;
        }, {} as Record<string, number>),
      };

      return response.json(formattedData);
    } catch (error) {
      console.error('Erro ao processar dados:', error);
      return response.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }

    public async update(request: Request, response: Response): Promise<Response> {
    const { preco, fk_id_posto, fk_id_combustivel } = request.body;

    try {
      const updatePrecoPostoService = new UpdatePrecoPostoService();
      const updatedPreco = await updatePrecoPostoService.execute({
        preco,
        fk_id_posto,
        fk_id_combustivel,
      });

      return response.json(updatedPreco);
    } catch (error) {
      console.error('Erro ao atualizar o preço do posto:', error);
      return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }
}
