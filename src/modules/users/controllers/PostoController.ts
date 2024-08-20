import CreatePostoService from "../services/CreatePostoService";
import ListPostoService from "../services/ListPostoService";
import { Request, Response} from 'express';
import UpdatePostoImageService from "../services/UpdatePostoImageService";
import path from 'path';

export default class PostoController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listPosto = new ListPostoService();

    const id_combustivel  = request.params.id_combustivel;

    if (!id_combustivel) {
      return response.status(400).json({
        status: 'error',
        message: 'É obrigatório informar o id_combustivel.',
      });
    }
    const postos = await listPosto.execute(id_combustivel);

    return response.json(postos)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {nome, cnpj, senha, imagem, fk_id_plano, fk_id_endereco} = request.body;

    const createUser = new CreatePostoService

    const user = await createUser.execute({
      nome,
      cnpj,
      senha,
      imagem,
      fk_id_plano,
      fk_id_endereco,
    });

    return response.json(user);
  }

  public async updateImage(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const imagem = request.file?.filename; // Obtém o nome do arquivo da imagem

    // Verifica se a imagem foi fornecida
    if (!imagem) {
      return response.status(400).json({
        status: 'error',
        message: 'Nenhuma imagem foi fornecida.',
      });
    }

    // Construa o caminho relativo da imagem
    const imagePath = path.join('uploads', imagem);

    const baseUrl = `${request.protocol}://${request.get('host')}`;
    const imageUrl = `${baseUrl}/uploads/${imagem}`;

    const updatePostoImage = new UpdatePostoImageService();

    try {
      const posto = await updatePostoImage.execute({
        id: Number(id), // Converte o ID para número
        imagem: imageUrl, // Passa o caminho da imagem para o serviço
      });

      return response.json(posto);
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        message: 'erro ao anexar imagem'
      });
    }
  }
}
