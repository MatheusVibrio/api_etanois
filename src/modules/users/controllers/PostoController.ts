import CreatePostoService from "../services/CreatePostoService";
import ListPostoService from "../services/ListPostoService";
import { Request, Response} from 'express';

export default class PostoController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listPosto = new ListPostoService();

    const postos = await listPosto.execute();

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
