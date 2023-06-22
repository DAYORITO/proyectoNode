const {Router} = require('express');
const route = Router();

const {getReserva,postReserva} = require('../controller/reservas');

route.get('/reservas', getReserva);
route.post('/reservas', postReserva);

module.exports = route;
