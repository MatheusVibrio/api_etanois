import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import PostoRepository from '../../typeorm/repositories/PostoRepository'
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth'
import Posto from '../../typeorm/entities/Posto';

interface IRequest {
  cnpj: string;
  senha: string;
}

interface IResponse {
  user: Posto,
  token: String;
}

class CreateSessionsService {
  public async execute({cnpj, senha}: IRequest): Promise<IResponse> {
    const UserRepository = getCustomRepository(PostoRepository);
    // Achando email
    const user = await UserRepository.findByCnpj(cnpj);

    if (!user) {
      throw new AppError('CNPJ ou senha incorreto(s).',401);
    }

    // Comparando a senha encriptografada com a digitada
    const senhaConfirmado = await compare(senha, user.senha)

    if (!senhaConfirmado) {
      throw new AppError('CNPJ ou senha incorreto(s).',401);
    }

    // No campo subject ele irá retornar o id do usuário para facilitar no front-end
    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id_posto.toString(),
      expiresIn: authConfig.jwt.expiresIn,
    })

    return {
      user,
      token,
    };
  }
}

export default CreateSessionsService;
