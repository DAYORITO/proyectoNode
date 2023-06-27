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
    fechaCreacion:{
        type: Date,
        default: new Date(),
    },
    espacio:{
        type:String,
        validate:{
            validator: (value) => {
                const regex =/^[A-Za-z]?\d{3}$/;
                return regex.test(value);
            },
            message: "El valor de el espacio es invalido",
        },
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

}); 

CuentaCobroSchema.pre('save', function (next) {

    const fechaLimite = this.fechaLimite;
    const diaLimite = fechaLimite.getDate();
    const mesLimite = fechaLimite.getMonth() + 1;
    const anioLimite = fechaLimite.getFullYear();
  
    this.fechaLimite = new Date(`${mesLimite}/${diaLimite}/${anioLimite}`);
  
    const fechaCreacion = this.fechaCreacion;
    const diaCreacion = fechaCreacion.getDate();
    const mesCreacion = fechaCreacion.getMonth() + 1;
    const anioCreacion = fechaCreacion.getFullYear();
  
    this.fechaCreacion = new Date(`${mesCreacion}/${diaCreacion}/${anioCreacion}`);
  
    next();
});

module.exports = model("CuentaCobro", CuentaCobroSchema);