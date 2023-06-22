const CuentaCobro = require("../models/cuentascobros");

const getCuentasCobros = async (req, res) => {
    try{
        const cuenta = await CuentaCobro.find();
        res.json({
            mensaje: "Consulta exitosa",
            reservas: cuenta
        });
    }catch(e){
        res.json({
            mensaje: "Hubo un error ",
            e,
        })
    }
};
const postCuentasCobros = async (req, res) => {
    try{
        const body = req.query;
        console.log(body);
        const cuenta = new CuentaCobro(body);
        console.log(body);
        await cuenta.save();
        res.json({
            mensaje: "Cuenta de cobro creada exitosamente",
            cuenta
        });
    }catch(e){
        res.status(500).json({
            mensaje: "Error al registrar cuenta",
            e,
        });
    }
};

const putCuentasCobros = async (req, res) => {
    try{
        const body = req.query;
        let camposEditar = {...body}
        console.log(camposEditar)
        delete camposEditar._id;
        delete camposEditar.NroCuenta
        delete camposEditar.apartamento
        delete camposEditar.fechaCreacion
        console.log(camposEditar)
        console.log(body._id)
        const cuenta = await CuentaCobro.findOneAndUpdate({NroCuenta: body.NroCuenta}, camposEditar, {new: true});
        const cuentaModificada = await CuentaCobro.find({NroCuenta: body.NroCuenta})
        res.json({
            mensaje: "Se modifico exitosamente la cuenta",
            cuenta,
            mensaje2: "Se modifico a: ",
            cuentaModificada,
        });
    }catch(e){
        res.json({
            mensaje: "Error al modificar",
            e,
        });
    };
};
const deleteCuentasCobros = async (req, res) => {
    const body = req.query;
    console.log(body);
    const cuenta = await CuentaCobro.findOneAndDelete({codigoReserva: body.codigoReserva});
    res.json({
        mensaje: "Se elimino la cuenta",
        cuenta
    })
}

module.exports = {
    getCuentasCobros,
    postCuentasCobros,
    putCuentasCobros,
    deleteCuentasCobros
}