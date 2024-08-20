import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import PlanoController from '../controllers/PlanoController';


const planosRouter = Router();
const plano = new PlanoController();

planosRouter.get('/' ,plano.listagem);


export default planosRouter
