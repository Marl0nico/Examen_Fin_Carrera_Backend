import { Router } from "express";
const router = Router();
import { crearUsuario, verUsuario, verUsuarios, actualizarUsuario, eliminarUsuario } from "../controllers/Tecnicos_controller.js";
import verificarAutenticacion from "../middlewares/Autenticación.js";
//Crear un usuario
router.post('/tecnico/crear', verificarAutenticacion, crearUsuario);
//Ver todos los usuarios
router.get('/tecnico/tecnicos', verificarAutenticacion, verUsuarios);
//Ver un usuario
router.get('/tecnico/:id', verificarAutenticacion, verUsuario);
//Actualizar un usuario
router.put('/tecnico/actualizar/:id', verificarAutenticacion, actualizarUsuario);
//Eliminar un usuario
router.delete('/tecnico/eliminar/:id', verificarAutenticacion, eliminarUsuario);
export default router;