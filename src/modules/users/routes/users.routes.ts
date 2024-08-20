import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate';
import PostoController from '../controllers/PostoController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import uploadConfig from '@config/uploadConfig';

const userRouter = Router();
const postoController = new PostoController();

//const upload = multer(uploadConfig)

userRouter.get('/:id_combustivel' ,postoController.index);

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      cnpj: Joi.string().required(), 
      senha: Joi.string().required(),
      imagem: Joi.string().required(),
      fk_id_plano: Joi.number().required(),
      fk_id_endereco: Joi.number().required(),
    },
  }),
  postoController.create,
);

userRouter.patch(
  '/:id',
  uploadConfig.single('imagem'), // Define o campo de arquivo como 'imagem'
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  postoController.updateImage,
);


export default userRouter
