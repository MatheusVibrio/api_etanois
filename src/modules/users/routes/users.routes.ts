import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate';
import PostoController from '../controllers/PostoController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';

const userRouter = Router();
const postoController = new PostoController();

const upload = multer(uploadConfig)

userRouter.get('/', isAuthenticated ,postoController.index);

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      cnpj: Joi.string().required(), 
      senha: Joi.string().required(),
      fk_id_endereco: Joi.string().required(),
    },
  }),
  postoController.create,
);


export default userRouter
