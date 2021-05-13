

const { io } = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand(new Band('Queen Queen'));
bands.addBand(new Band('Guns and Roses'));
bands.addBand(new Band('Metallica'));
bands.addBand(new Band('Bon Jovi'));


//Mensajes de Sockets

io.on('connection', client => {
    console.log('Cliente conectado')

    client.emit('bandas-activas', bands.getBands());

    client.on('disconnect', () => {
        console.log('Cliente desconectado')
    });

    client.on('mensajealservidor-WEB', (payload) => {
        console.log('Mensaje del Cliente Web : ', payload)
        io.emit('respuestaalcliente-WEB', { admin: 'Bienvenido Web' })
    });

    /*  client.on('mensajealservidor', (payload) => {
         console.log('Llego mensaje del cliente', payload)
         //io.emit('respuestaalcliente', { admin: 'RESPUESTA' }) // Todos escuchan
         client.broadcast.emit('respuestaalcliente', payload) // Todos escuchan menos el que lo emite
     }); */

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('bandas-activas', bands.getBands());
    });

    client.on('new-band', (payload) => {
        bands.addBand(new Band(payload.name));
        io.emit('bandas-activas', bands.getBands());
    });


    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('bandas-activas', bands.getBands());
    });

});

