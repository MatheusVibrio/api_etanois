import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import EnderecoRepository from '../../typeorm/repositories/EnderecoRepository';
import Endereco from '@modules/typeorm/entities/Endereco';

interface IRequest {
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  telefone: string;
  numero: number;
}

class CreateEnderecoService {
  public async execute({ rua, bairro, cidade, estado, cep, telefone, numero}: IRequest): Promise<Endereco> {
    const vEnderecoRepository = getCustomRepository(EnderecoRepository);
    
    // Agora crie um novo Endereco
     const endereco = vEnderecoRepository.create({
      rua,
      bairro,
      cidade,
      estado,
      cep,
      telefone,
      numero
    });

    await vEnderecoRepository.save(endereco);

    return endereco;

  }
}

export default CreateEnderecoService;
