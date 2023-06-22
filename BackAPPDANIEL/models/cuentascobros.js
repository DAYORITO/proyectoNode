const {Schema, model} = require('mongoose');

const CuentaCobroSchema = Schema({
    NroCuenta:{
        type: Number,
        required: [true, "No se pudo indexar el Nro de cuenta"]
    },
    archivo: {
        data: Buffer, // Campo para almacenar los datos binarios del archivo
        contentType: String // Campo para almacenar el tipo MIME del archivo
      },
    fechaLimite:{
        type: Date,
        required: [true, "Se requiere introducir una fecha limite"]
    },
    fechaCreacionCuenta:{
        type: Date,
        required: [true, "Se requiere introducir una fecha limite"]
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
        required: [true, "No se indexo nada en el campo cobros"],
        validate: {
          validator: function (cobros) {
            return cobros.length > 0;
          },
        }
    }

})
module.exports = model("CuentaCobro", CuentaCobroSchema);