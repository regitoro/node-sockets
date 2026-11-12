const express = require('express');
const http = require('http');
const {Server} = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

//servir archivps estaticos
app.use(express.static('public'));

//detectar conexiones
io.on('connection', (socket) => {
    console.log('Usuario conectado', socket.id);

    //recibir mensajes
    //nuevo: ahora se recibe {nombre, texto}
    socket.on('mensaje', ({nombre, texto}) => {
        console.log('mensaje recibido', nombre, texto);

        //enviar mensaje a todos los clientes conectados
        //io.emit('mensaje', texto);

        //nuevo: enviar tambien el id y el nombre de quien emite el mensaje
        io.emit("mensaje", {id: socket.id, nombre, texto});
    });

//detectar desconexiones
socket.on("disconnect", () => {
    console.log('Usuario desconectado', socket.id);
});

});

//para correrlo en local
// server.listen(3000, () => {
//     console.log("servidor activo en http://localhost:3000");
// });

//nuevo: usar el puerto que asigne el hosting (Render) o 3000 en local
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`servidor activo en el puerto ${PORT}`);

});
