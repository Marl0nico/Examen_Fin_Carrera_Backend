import { crearTicket, verTicket, verTickets, actualizarTicket, eliminarTicket } from "../controllers/Tickets_controller.js";
import { Router } from "express";
const router = Router();
import verificarAutenticacion from "../middlewares/Autenticación.js";
//Crear una matricula
router.post('/ticket/crear', verificarAutenticacion, crearTicket);
//Ver todas las matriculas
router.get('/ticket/tickets', verificarAutenticacion, verTickets);
//Ver una matricula
router.get('/ticket/:id', verificarAutenticacion, verTicket);
//Actualizar una matricula
router.put('/ticket/actualizar/:id', verificarAutenticacion, actualizarTicket);
//Eliminar una matricula
router.delete('/ticket/eliminar/:id', verificarAutenticacion, eliminarTicket);
export default router;