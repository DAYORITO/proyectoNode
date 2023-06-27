const Cobro = require("../models/cobros");

const getCobro = async (req, res) => {
    try{
        const cobro = await Cobro.find();
        res.json({
            mensaje: "Consulta exitosa",
            cobro: cobro
        });
    }catch(e){
        res.json({
            mensaje: "Hubo un error ",
            e,
        })
    }
};
const postCobro = async (req, res) => {
    try{
        const body = req.body;
        const cobro = new Cobro(body);
        console.log(body);
        await cobro.save();
        res.json({
            mensaje: "Cobro creada exitosamente",
            cobro
        });
    }catch(e){
        res.status(500).json({
            mensaje: "Error al registrar cobro",
            e,
        });
    }
};

const putCobro = async (req, res) => {
    try{
        const body = req.body;
        let camposEditar = {...body}
        console.log(camposEditar)
        delete camposEditar._id;
        delete camposEditar.codigoCobro
        delete camposEditar.fechaCreacion
        delete camposEditar.tipoCobro
        console.log(camposEditar)
        console.log(body._id)
        const cobro = await Cobro.findOneAndUpdate({_id: body._id}, camposEditar, {new: true});
        const cobroModificado = await Cobro.find({codigoCobro: body.codigoCobro})
        res.json({
            mensaje: "Se modifico exitosamente el cobro",
            cobro,
            mensaje2: "Se modifico a: ",
            cobroModificado,
        });
    }catch(e){
        res.json({
            mensaje: "Error al modificar",
            e,
        });
    };
};
const deleteCobro = async (req, res) => {
    const body = req.body;
    console.log(body);
    const cobro = await Cobro.findOneAndDelete({_id: body._id});
    res.json({
        mensaje: "Se elimino el cobro",
        cobro
    })
}

module.exports = {
    getCobro,
    postCobro,
    putCobro,
    deleteCobro
}