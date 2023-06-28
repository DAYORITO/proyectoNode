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
        const body = req.body;
        delete body.fechaCreacion;
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
        const body = req.body;
        let camposEditar = {...body}
        console.log(camposEditar)
        delete camposEditar._id;
        delete camposEditar.tipoReserva
        delete camposEditar.codigoReserva
        delete camposEditar.fechaCreacion
        delete camposEditar.propietario
        delete camposEditar.espacio
        console.log(camposEditar)
        console.log(body._id)
        const reserva = await Reserva.findOneAndUpdate({_id: body._id}, camposEditar, {new: true});
        const reservaModificada = await Reserva.find({_id: body._id})
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
    const body = req.body;
    console.log(body);
    const reserva = await Reserva.findOneAndDelete({_id: body._id});
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