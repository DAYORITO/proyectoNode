const CuentaCobro = require("../models/cuentascobros");

const getCuentasCobros = async (req, res) => {
    try{
        const cuenta = await CuentaCobro.find();
        res.json({
            mensaje: "Consulta exitosa",
            cuenta: cuenta
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
        const body = req.body;
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
        const body = req.body;
        let camposEditar = {...body}
        console.log(camposEditar)
        delete camposEditar._id;
        delete camposEditar.NroCuenta
        delete camposEditar.espacio
        delete camposEditar.fechaCreacion
        console.log(camposEditar)
        console.log(body._id)
        const cuenta = await CuentaCobro.findOneAndUpdate({_id: body._id}, camposEditar, {new: true});
        const cuentaModificada = await CuentaCobro.find({_id: body._id})
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
    const body = req.body;
    console.log(body);
    const cuenta = await CuentaCobro.findOneAndDelete({_id: body._id});
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
