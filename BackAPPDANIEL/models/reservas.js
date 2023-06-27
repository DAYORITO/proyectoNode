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
                const regextipo = /^[A-Za-z\s]+$/;
                return regextipo.test(value);
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
                const regexespacio =/^[A-Za-z]?\d{3}$/;
                return regexespacio.test(value);
            },
            message: "El valor de el espacio es invalido",
        },
        required: [true, "se requiere el numero del espacio"]
    },
    propietario:{
        type: String,
        validate:{
            validator: (value)=>{
                const regexpropi = /^[A-Za-z\s]+$/;
                return regexpropi.test(value);
            },
            message: "Valor invalido para el propietario"
        },
        required: [true, "no se guardo el propietario"]
    },
    vehiculo:{
        type: String,
        validate:{
            validator: (value)=>{
                const regexMatricula = /^(N\/A|[A-Za-z]{3}\d{3})$/;
                return regexMatricula.test(value)
            },
            message: "Valor invalido para la matricula"
        },
        default: "N/A",
    }

})
module.exports = model("Reserva", ReservaSchema);