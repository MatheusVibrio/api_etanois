import {Request, Response} from 'express'
import CreateEnderecoService from '../services/CreateEnderecoService';

export default class EnderecoController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {rua, bairro, cidade, estado, cep, telefone, numero} = request.body;

    const createEndereco = new CreateEnderecoService

    const endereco = await createEndereco.execute({
      rua,
      bairro,
      cidade,
      estado,
      cep,
      telefone,
      numero
    });

    return response.json(endereco);
  }
}
