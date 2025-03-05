//Requerir los módulos necesarios para el servidor
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
//Inicializaciones del servidor
const app=express();
dotenv.config();
//Configuraciones del servidor
app.set('port', process.env.PORT || 3000);
app.use(cors());
//Middlewares
app.use(express.json());
//Rutas
app.get('/',(req,res)=>{
    res.send("Servidor activo");
});
//Iniciar el servidor
export default app;
