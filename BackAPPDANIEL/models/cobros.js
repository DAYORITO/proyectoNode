const {Schema, model} = require('mongoose');

const CobroSchema = Schema({
    codigoCobro:{
        type: String,
        validate:{
            validator: (value)=>{
            const regex = /^[A-Za-z]{2,3}\d{3}$/
            return regex.test(value)
            },
            message: "El valor no es valido para el campo de tipo de cobro",
        },
        required: [true, "No se indexo el codigo"],
        unique: true
    },
    tipoCobro:{
        type: String,
        validate:{
            validator: (value)=>{
                const regex = /^[A-Za-z\s]+$/
                return regex.test(value);
            },
            message: "Valor invalido para tipo de reserva"
        },
        required: [true, "Se requiere especificar el tipo de cobro"],
    },
    fechaCreacion:{
        type: Date,
        default: new Date(),
    },
    estado:{
        type: String,
        default: "Activo",
        validate:{
            validator: (value)=>{
                return value=="Activo" || value=="Inactivo"
            },
            message: "El estado no cumple con el formato"
        }
        
    },
    valor:{
        type: Number,
        validate: {
            validator: (value) => {
              return value >= 0;
            },
            message: "El valor no puede ser negativo",
        }
    },
    descripcion:{
        type: String,
        required: [true, "Se requiere una descripcion de el cobro"]
    }

})
CobroSchema.pre('findOneAndUpdate', function (next) {
    if (this.valor < 0) {
      const error = new Error("El valor no puede ser negativo");
      return next(error);
    }
    next();
  });
module.exports = model("Cobro", CobroSchema);
