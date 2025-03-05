import { Router } from "express";
const router = Router();
import { crearCliente, verCliente, verClientes, actualizarCliente, eliminarCliente} from "../controllers/Clientes_controller.js";
import verificarAutenticacion from "../middlewares/Autenticación.js";
//Crear un cliente
router.post('/cliente/crear', verificarAutenticacion, crearCliente);
//Ver todos los clientes
router.get('/cliente/clientes', verificarAutenticacion, verClientes);
//Ver un cliente
router.get('/cliente/:id', verificarAutenticacion, verCliente);
//Actualizar un cliente
router.put('/cliente/actualizar/:id', verificarAutenticacion, actualizarCliente);
//Eliminar un cliente
router.delete('/cliente/eliminar/:id', verificarAutenticacion, eliminarCliente);
export default router;
