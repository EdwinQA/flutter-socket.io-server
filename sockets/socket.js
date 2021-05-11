

const { io } = require('../index');

//Mensajes de Sockets

io.on('connection', client => {
    console.log('Cliente conectado')

    client.on('disconnect', () => {
        console.log('Cliente desconectado')
    });

    client.on('mensajealservidor', (payload) => {
        console.log('Llego mensaje del cliente', payload)
        io.emit('respuestaalcliente', { admin: 'Servidor Responde al cliente' })
    });


});