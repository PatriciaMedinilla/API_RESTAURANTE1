const prisma = require('../prisma/client')
// controlador que sirve para las acciones de las mesas

// metodo para obtener todas las mesas
//funcion asincrona: funcion que se ejecuta en segundo plano
const obtenerReservas = async (req, res) => {
    //select * from reservaciones = findMany()
    const lista_reservas = await prisma.reservaciones.findMany();
    res.status(200).json(lista_reservas)
}

//funcion para obtener una reserva por su ID
const obtenerReservasById = async (req, res) => {
    // obtener el id de la ruta
    const idReservas = Number(req.params.id)
    // select * from reservaciones where id = idReservas
    const reservas = await prisma.reservaciones.findUnique({
        where: { id: idReservas },
    });

    // validamos si la reservano existe
    if(!reserva){
        return res.status(404).json({ error: "Reserva no encontrada" })
    }

    res.status(200).json(reservas)
}

// funcion para crear una nueva reserva
const crearReservas = async (req, res) => {
    // obtenemos los datos para crear la reserva (body/formulario)
    const { fecha, hora, personas, estado } = req.body

    // INSERT INTO reservaciones (fecha, hora, personas, estado, usuario_id, mesa_id) VALUES  ('2026-06-25', '12:00', 2, 'confirmada', 2, 1)

    const nuevaReserva = await prisma.reservaciones.create({
        data: {
            fecha,
            hora,
            personas,
            estado
        },
    });

    // 201 = CREATED SUCCESUFFLY
    res.status(201).json({
        message: "Reservación  registrada correctamente",
        reserva: nuevaReserva
    })
}

// Actualizar una reservación por ID
const actualizarReservas = async (req, res) => {
    const id = Number(req.params.id)

    const existe = await prisma.reservaciones.findUnique({ where: { id } })
    if (!existe) {
        return res.status(404).json({ error: 'Reservación no encontrada' })
    }

    // Update reservaciones set fecha = '2026-06-25', hora = '19:00', personas = 6, estado = 'confirmada' where id = 1
    const reserva = await prisma.reservaciones.update({
        where: { id },
        data: req.body //fecha, hora, personas, estado
    })

    res.status(200).json({
        message: 'Reservación actualizada exitosamente',
        reserva
    })
}

// Método que desactiva una reservación por ID (cambia el estado a 'cancelada')
const desactivarReservas = async (req, res) => {
    const id = Number(req.params.id)

    const existe = await prisma.reservaciones.findUnique({ where: { id } })
    if (!existe) {
        return res.status(404).json({ error: 'Reservación no encontrada' })
    }

    await prisma.reservaciones.update({
        where: { id },
        data: { estado: 'cancelada' }
    })

    res.status(200).json({ message: 'Reservación cancelada' })
}

// exportando los metodos para ocuparlos en cualquier lugar
module.exports = {
    obtenerReservas,
    obtenerReservasById,
    crearReservas,
    actualizarReservas,
    desactivarReservas
}