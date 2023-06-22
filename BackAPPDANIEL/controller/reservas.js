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
            mensaje: "Error al registrar reserva",
            e,
        });
    }
};

const putReserva = async (req, res) => {
    try{
        const body = req.query;
        let camposEditar = {...body}
        console.log(camposEditar)
        delete camposEditar._id;
        delete camposEditar.tipoReserva
        delete camposEditar.codigoReserva
        delete camposEditar.fechaCreacion
        delete camposEditar.nroApartamento
        console.log(camposEditar)
        console.log(body._id)
        const reserva = await Reserva.findOneAndUpdate({codigoReserva: body.codigoReserva}, camposEditar, {new: true});
        const reservaModificada = await Reserva.find({codigoReserva: body.codigoReserva})
        res.json({
            mensaje: "Se modifico exitosamente la reserva",
            reserva,
            mensaje2: "Se modifico a: ",
            reservaModificada,
        });
    }catch(e){
        res.json({
            mensaje: "Error al modificar",
            e,
        });
    };
};
const deleteReserva = async (req, res) => {
    const body = req.query;
    console.log(body);
    const reserva = await Reserva.findOneAndDelete({codigoReserva: body.codigoReserva});
    res.json({
        mensaje: "Se elimino la reserva",
        reserva
    })
}

module.exports = {
    getReserva,
    postReserva,
    putReserva,
    deleteReserva
}