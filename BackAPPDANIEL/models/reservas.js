const {Schema, model} = require('mongoose');

const ReservaSchema = Schema({
    codigoReserva:{
        type: Number,
        unique: true,
        required: [true, "No se pudo indexar el codigo"]
    },
    tipoReserva: {
        type: String,
        validate:{
            validator: (value)=>{
                const regex = /^[A-Za-z\s]+$/
                return regex.test(value);
            },
            message: "Valor invalido para tipo de reserva"
        },
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
    },
    espacio:{
        type: String,
        validate:{
            validator: (value) => {
                const regex =/^[A-Za-z]?\d{3}$/;
                return regex.test(value);
            },
            message: "El valor de el espacio es invalido",
        },
        required: [true, "se requiere el numero del espacio"]
    },
    propietario:{
        type: String,
        validate:{
            validator: (value)=>{
                const regex = /^[A-Za-z\s]+$/
                return regex.test(value);
            },
            message: "Valor invalido para el propietario"
        },
        required: [true, "no se guardo el propietario"]
    },
    vehiculo:{
        type: String,
    }

})
module.exports = model("Reserva", ReservaSchema);