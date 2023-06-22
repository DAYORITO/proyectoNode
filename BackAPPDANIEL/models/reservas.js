const {Schema, model} = require('mongoose');

const ReservaSchema = Schema({
    codigoReserva:{
        type: Number,
        unique: true,
        required: [true, "No se pudo indexar el codigo"]
    },
    tipoReserva: {
        type: String,
        required: [true, "No se guardo el tipo de reserva"]
    },
    fechaReservar:{
        type: Date,
        validate: {
            validator: (value)=> {
                fecha= new Date();
              return fecha < value;
            },
            message: "Fecha no aceptada"
        },
        required: [true, "No se guardo la fecha de reserva"]
    },
    fechaCreacion:{
        type: Date,
        default: new Date(),
        required: [true, "No se guardo la fecha de creacion"]
    },
    nroApartamento:{
        type: String,
        required: [true, "no se guardo el nro del apartamento"]
    },
    propietario:{
        type: String,
        required: [true, "no se guardo el propietario"]
    },
    vehiculo:{
        type: String,
    }

})
module.exports = model("Reserva", ReservaSchema);