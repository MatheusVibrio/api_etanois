import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { PrecoPostoRepository } from '@modules/typeorm/repositories/PrecoPostoRepository';

export class PrecoPostoController {
  public async detalhes(request: Request, response: Response): Promise<Response> {
    const { id_posto } = request.body;

    if (!id_posto) {
      return response.status(400).json({
        status: 'error',
        message: 'É obrigatório informar o id_posto.',
      });
    }

    const listDetalhes = getCustomRepository(PrecoPostoRepository); // Obtém o repositório customizado
    
      const detalhes = await listDetalhes.findByPostoId(id_posto as string); // Exemplo de chamada de serviço
      return response.json(detalhes);
    
  }
}
