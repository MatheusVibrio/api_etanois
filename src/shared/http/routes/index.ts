import sessionsRouter from '@modules/users/routes/sessions.routes';
import userRouter from '@modules/users/routes/users.routes';
import precoPostoRouter from '@modules/preco_posto/routes/precoposto.routes';
import { Router } from 'express';
import path from 'path';
import planosRouter from '@modules/planos/routes/planos.routes';

const   routes = Router();

routes.use('/posto', userRouter); // rota de posto para CRUDE
routes.use('/sessions', sessionsRouter); // rota de autenticação para login
routes.use('/precos', precoPostoRouter); // rota para detalhes de preço
routes.use('/planos', planosRouter); // rota para listagem dos planos

export default routes;
