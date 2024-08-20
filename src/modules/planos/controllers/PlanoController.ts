import {Request, Response} from 'express'
import ListPlanosService from '../services/ListPlanosService';

export default class PlanoController {
  public async listagem(request: Request, response: Response): Promise<Response> {
    const {cnpj, senha} = request.body;

    const listPlanos = new ListPlanosService();

    const planos = await listPlanos.execute();

    return response.json(planos);
  }
}
