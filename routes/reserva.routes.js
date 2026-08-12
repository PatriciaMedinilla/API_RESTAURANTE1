// manejando las rutas para los metodos de la seccion "Reservaciones"
const express = require('express')

// constante principal para manejar las rutas
const router = express.Router()

// llamando a los métodos a utilizar para las rutas
const {
    obtenerReservas,
    obtenerReservasById,
    crearReservas,
    actualizarReservas,
    desactivarReservas
} = require('../controller/reserva.controller')
const { verificarToken, verificarAdmin } = require('../middleware/auth.middleware')

// creando las rutas (/api/reservas)
router.get('/', obtenerReservas) // /api/v1/reservas/
// ruta con parámetro
router.get('/:id', obtenerReservasById) // /api/v1/reservas/:id

// rutas protegidas
// antes de la accion, se agrega los permisos para entrar a esa ruta
router.post('/', verificarToken, verificarAdmin, crearReservas) // /api/v1/reservas/
router.put('/:id', verificarToken, verificarAdmin, actualizarReservas) // /api/v1/reservas/:id
// puede desactivar la reserva de un cliente
router.patch('/:id', verificarToken, desactivarReservas) // /api/v1/reserva/:id

// exportando las rutas
module.exports = router