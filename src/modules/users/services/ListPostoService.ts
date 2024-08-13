import { getCustomRepository } from 'typeorm';
import Posto from '../typeorm/entities/Posto';
import PostoRepository from '../typeorm/repositories/PostoRepository';

class ListPostoService {
  public async execute(): Promise<Posto[]> {
    const postoRepository = getCustomRepository(PostoRepository);

    const postos = postoRepository.find();

    return postos;
  }
}

export default ListPostoService;
