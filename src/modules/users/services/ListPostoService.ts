import { getCustomRepository } from 'typeorm';
import Posto from '../../typeorm/entities/Posto';
import PostoRepository from '../../typeorm/repositories/PostoRepository';

class ListPostoService {
  public async execute(id_combustivel: string): Promise<any[]> {
    const postoRepository = getCustomRepository(PostoRepository);

    const detalhes = await postoRepository.findByTipoCombustivel(id_combustivel);
    return detalhes;
  }
}

export default ListPostoService;
