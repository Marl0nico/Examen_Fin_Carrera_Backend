import { Router } from "express";
const router = Router();
import { login, perfilAdmin, registroAdmin } from "../controllers/Admin_controlador.js";
import verificarAutenticacion from "../middlewares/Autenticación.js";
//Registro de usuarios
router.post('/registro', registroAdmin);
//Iniciar sesión
router.post('/login', login);
//Mostrar datos del usuario
router.get('/perfil', verificarAutenticacion, perfilAdmin);
export default router;
