import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors'
import cors from 'cors';
import routes from './routes'
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const uploadsPath = path.resolve(__dirname, '..', '..', '..', 'uploads');
app.use('/uploads', express.static(uploadsPath));

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }                             

  return response.status(500).json({
    status: 'error',
    message: error.message,
  });
});

app.listen(3333, () => {
  console.log('Server starded on port 3333!')
});




