const {Router} = require('express');
const route = Router();

const {getCuentasCobros, postCuentasCobros, putCuentasCobros, deleteCuentasCobros} = require('../controller/cuentascobros');

    route.get('/cuentas', getCuentasCobros)
    route.post('/cuentas', postCuentasCobros)
    route.put('/cuentas', putCuentasCobros)
    route.delete('/cuentas', deleteCuentasCobros)

module.exports = route;
