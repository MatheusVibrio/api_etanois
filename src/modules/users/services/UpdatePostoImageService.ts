import { getCustomRepository } from 'typeorm';
import PostoRepository from '@modules/typeorm/repositories/PostoRepository';
import AppError from '@shared/errors/AppError';
import Posto from '@modules/typeorm/entities/Posto';

interface IRequest {
  id: number;
  imagem?: string; // Recebe o caminho da imagem
}

class UpdatePostoImageService {
  public async execute({ id, imagem }: IRequest): Promise<Posto> {
    const postoRepository = getCustomRepository(PostoRepository);

    // Verifica se o posto existe
    const posto = await postoRepository.findOne(id);
    if (!posto) {
      throw new AppError('Posto não encontrado.');
    }

    // Atualiza o campo de imagem com o caminho fornecido
    posto.imagem = imagem || posto.imagem; // Mantém o valor anterior se a imagem não for fornecida

    // Salva as alterações no banco de dados
    await postoRepository.save(posto);

    return posto;
  }
}

export default UpdatePostoImageService;
