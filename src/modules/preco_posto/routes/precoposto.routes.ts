import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/uploadConfig';
import { PrecoPostoController } from '../controllers/PrecoPostoController';

const precoPostoRouter = Router();
const precoPosto = new PrecoPostoController();

precoPostoRouter.get('/:id_posto' ,precoPosto.detalhes);

precoPostoRouter.put(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      preco: Joi.number().required(),
      fk_id_posto: Joi.number().required(), 
      fk_id_combustivel: Joi.number().required(),
    },
  }),
  precoPosto.update,
);


export default precoPostoRouter
