import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { PrecoPostoController } from '../controllers/PrecoPostoController';

const precoPostoRouter = Router();
const precoPosto = new PrecoPostoController();

const upload = multer(uploadConfig)

precoPostoRouter.get('/' ,precoPosto.detalhes);


export default precoPostoRouter
