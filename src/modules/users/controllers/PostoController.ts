import CreatePostoService from "../services/CreatePostoService";
import ListPostoService from "../services/ListPostoService";
import { Request, Response} from 'express';

export default class PostoController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listPosto = new ListPostoService();

    const { id_combustivel } = request.body;

    if (!id_combustivel) {
      return response.status(400).json({
        status: 'error',
        message: 'É obrigatório informar o id_combustivel.',
      });
    }
    const postos = await listPosto.execute(id_combustivel as number);

    return response.json(postos)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {nome, cnpj, senha, fk_id_endereco} = request.body;

    const createUser = new CreatePostoService

    const user = await createUser.execute({
      nome,
      cnpj,
      senha,
      fk_id_endereco,
    });

    return response.json(user);
  }
}
