// Importar JWT y los Modelos
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
//import dotenv from 'dotenv';
//dotenv.config();

// Método para proteger rutas
const verificarAutenticacion = async (req, res, next) => {
  // Verificar si se envió el token en los headers
  if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
    console.log("Authorization header:", req.headers.authorization);
    return res.status(401).json({ msg: "Lo sentimos, debes proporcionar un token válido" });
  }

  // Extraer el token de los headers
  const { authorization } = req.headers;
  //console.log("JWT_SECRET usado:", process.env.JWT_SECRET);
  try {
    // Verificar y decodificar el token
    const token = authorization.split(' ')[1]; // Extraer el token después de "Bearer"
    //console.log("Token recibido en el middleware:", `"${req.headers.authorization.split(' ')[1]}"`);
    const { idToken, rol } = jwt.verify(token, process.env.JWT_SECRET); // Decodificar el token usando la clave secreta

    // Verificar el rol del usuario
    if (rol === "Admin") {
      // Obtener los datos del administrador desde la base de datos
      req.adminBDD = await Admin.findById(idToken).lean().select("-password");
      //next()
      if (!req.adminBDD) {
        return res.status(404).json({ msg: "Administrador no encontrado" });
      }
    } else if (rol === "Estudiante") {
      // Obtener los datos del estudiante desde la base de datos
      req.estudianteBDD = await Estudiante.findById(idToken).lean().select("-password");
      //next()
      if (!req.estudianteBDD) {
        return res.status(404).json({ msg: "Estudiante no encontrado" });
      }
    } else {
      // Si el rol no es válido
      return res.status(403).json({ msg: "Rol no autorizado" });
    }

    // Continuar con el siguiente middleware o controlador
    next();
  } catch (error) {
    // Capturar errores del token y responder
    console.log(error.message)
    return res.status(401).json({ msg: "Formato del token no válido o ha expirado", error: error.message });
    

  }
};

// Exportar el middleware
export default verificarAutenticacion;