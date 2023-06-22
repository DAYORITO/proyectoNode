const {Schema, model} = require('mongoose');

const CobroSchema = Schema({
    codigoCobro:{
        type: String,
        required: [true, "No se indexo el codigo"],
        unique: true
    },
    tipoCobro:{
        type: String,
        required: [true, "Se requiere especificar el tipo de cobro"],
        
    },
    fechaCreacion:{
        type: Date,
        default: new Date(),
    },
    estado:{
        type: String,
        default: "Activo",
        validate: (value)=>{
            return value == "Activo" || value == "Inactivo"
        },
        message: "No se pudo registrar el estado"
    },
    valor:{
        type: Number,
        default: 0,
        validate: (value)=>{
            return value >= 0;
        },
        message: "No se pudo registrar el valor"
    },
    descripcion:{
        type: String,
        required: [true, "Se requiere una descripcion de el cobro"]
    }

})
module.exports = model("Cobro", CobroSchema);