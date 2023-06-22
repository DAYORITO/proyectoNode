const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const CuentaCobroSchema = Schema({
    NroCuenta:{
        type: Number,
        unique: true,
        required: [true, "No se pudo indexar el Nro de cuenta"]
    },
    archivo: {
        data: Buffer, // Campo para almacenar los datos binarios del archivo
        contentType: String // Campo para almacenar el tipo MIME del archivo
      },
    fechaLimite:{
        type: Date,
        validate: {
            validator: (value)=> {
                fecha= new Date();
              return fecha < value;
            },
            message: "Fecha no aceptada"
        },
        required: [true, "Se requiere introducir una fecha limite"]
    },
    fechaCreacionCuenta:{
        type: Date,
        default: new Date(),
    },
    apartamento:{
        type:String,
        required: [true, "Se requiere introducir el apartamento"]
    },
    valortotal:{
        type: Number,
        required: [true, "No se indexo el valor total"]
    },
    cobros: {
        type: [mongoose.Schema.Types.Mixed],
        
        validate: {
          validator: function (cobros) {
            return cobros.length > 0;
          },
        },
        message: "no hay cobro"
    }

})
module.exports = model("CuentaCobro", CuentaCobroSchema);