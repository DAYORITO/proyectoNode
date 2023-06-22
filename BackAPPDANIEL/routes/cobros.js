const {Router} = require('express');
const route = Router();

const {getCobro, postCobro, putCobro, deleteCobro} = require('../controller/cobros');

    route.get('/cobros', getCobro)
    route.post('/cobros', postCobro)
    route.put('/cobros', putCobro)
    route.delete('/cobros', deleteCobro)

module.exports = route;