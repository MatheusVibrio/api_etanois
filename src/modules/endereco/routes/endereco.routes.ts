import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import EnderecoController from '../controllers/EnderecoController';


const enderecoRouter = Router();
const endereco = new EnderecoController();

enderecoRouter.post('/' ,endereco.create);

enderecoRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      rua: Joi.string().required(),
      bairro: Joi.string().required(), 
      cidade: Joi.string().required(),
      estado: Joi.string().required(),
      cep: Joi.string().required(),
      telefone: Joi.string().required(),
      numero: Joi.number().required(),
    },
  }),
  endereco.create,
);


export default enderecoRouter
