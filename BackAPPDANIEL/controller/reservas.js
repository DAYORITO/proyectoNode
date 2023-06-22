const Reserva = require("../models/reservas");

const getReserva = async (req, res) => {
    try{
        const reserva = await Reserva.find();
        res.json({
            mensaje: "Consulta exitosa",
            reservas: reserva
        });
    }catch(e){
        res.json({
            mensaje: "Hubo un error ",
            e,
        })
    }
};
const postReserva = async (req, res) => {
    try{
        const body = req.query;
        const reserva = new Reserva(body);
        console.log(body);
        await reserva.save();
        res.json({
            mensaje: "Reserva creada exitosamente"
        });
    }catch(e){
        res.status(500).json({
            mensaje: "Error al registrar persona",
            e,
        });
    }
};

const putReserva = async (req, res) => {
    try{
        const body = query.body;
        let camposEditar = {...body}
        console.log(camposEditar)
        delete camposEditar._id;
        delete camposEditar.tipoReserva
        delete camposEditar.fechaCreacion
        const reserva = await personalbar.findOneAndUpdate({_id:body._id}, camposEditar, {new: true});
        const reservaModificada = await personalbar.find({_id:body._id})
        res.json({
            mensaje: "Se modifico exitosamente la reserva",
            reserva,
            mensaje2: "Se modifico a: ",
            reservaModificada,
        });
    }catch(e){
        res.json({
            mensaje: "Se modifico exitosamente",
            e,
        });
    };
};

module.exports = {
    getReserva,
    postReserva,
}