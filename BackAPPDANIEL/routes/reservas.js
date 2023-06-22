const {Router} = require('express');
const route = Router();

const {getReserva,postReserva,putReserva,deleteReserva} = require('../controller/reservas');

route.get('/reservas', getReserva);
route.post('/reservas', postReserva);
route.put('/reservas', putReserva);
route.delete('/reservas', deleteReserva);

module.exports = route;
