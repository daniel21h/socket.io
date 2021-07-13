import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';
import { createServer } from 'http';
import mongoose from 'mongoose';
import path from 'path';
import { Server } from 'socket.io';

import 'express-async-errors';
import { AppError } from './errors/AppError';
import { routes } from './routes';

const app = express();

const server = createServer(app);

mongoose.connect('mongodb://localhost/rocketsocket', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  },
);

const io = new Server(server);

io.on('connection', socket => {
  console.log('Socket', socket.id);
});

export { server, io };
