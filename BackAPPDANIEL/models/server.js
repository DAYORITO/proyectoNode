const express = require('express');
const dbConection = require('../database/config');
const cors = require('cors');

class Server {
    constructor(){
    this.port = process.env.PORT;
    this.schemasPath = '/api/schema';
    this.app = express();
    this.middleware();
    this.routes();
    this.dbConection();
    }
    middleware(){
        this.app.use(cors());
        this.app.use(express.json());
    }
    routes(){
        this.app.use(this.schemasPath, require('../routes/reservas'));
        this.app.use(this.schemasPath, require('../routes/cuentascobros'));
        this.app.use(this.schemasPath, require('../routes/cobros'));
    };
    async dbConection(){
        await dbConection();
    }

    listen(){
        this.app.listen(9092, ()=>{
            console.log('Escuchando puerto', this.port);
        });
    };
}
module.exports = Server;