import { io } from '../http';

io.on('connect', socket => {
  socket.emit('welcome', {
    message: 'Seu chat foi iniciado!',
  });
});
