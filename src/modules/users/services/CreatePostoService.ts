import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Posto from '../typeorm/entities/Posto';
import PostoRepository from '../typeorm/repositories/PostoRepository';
import EnderecoRepository from '../typeorm/repositories/EnderecoRepository';
import { hash } from 'bcryptjs';

interface IRequest {
  nome: string;
  cnpj: string;
  senha: string;
  fk_id_endereco: number;
}

class CreatePostoService {
  public async execute({ nome, cnpj, senha, fk_id_endereco}: IRequest): Promise<Posto> {
    const vPostoRepository = getCustomRepository(PostoRepository);
    const vEnderecoRepository = getCustomRepository(EnderecoRepository);
    const emailExists = await vPostoRepository.findByCnpj(cnpj);

    if (emailExists){
      throw new AppError('CNPJ já cadastrado.');
    }

    const endereco = await vEnderecoRepository.findByEndereco(fk_id_endereco);

    if (!endereco){
      throw new AppError('Endereço não encontrado.');
    }

    // Encriptografando a senha
    const hashedPassword = await hash(senha,8)

    // Agora crie um novo Posto
    const posto = vPostoRepository.create({
    nome,
    cnpj,
    senha: hashedPassword,
    fk_id_endereco: endereco 
    });

    await vPostoRepository.save(posto);

    return posto;

  }
}

export default CreatePostoService;
