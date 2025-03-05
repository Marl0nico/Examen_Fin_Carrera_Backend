import app from './server.js';
import express from 'express';
import connection from './database.js';
import dotenv from 'dotenv';
import cors from 'cors';
import routerAdmin from './routers/Admin_routes.js';
import routerTecnicos from './routers/Tecnicos_routes.js';
import routerClientes from './routers/Clientes_routes.js';
import routerTickets from './routers/Tickets_routes.js';
import mongoose from 'mongoose';
//const app = express();
//Configuraciones del servidor
dotenv.config();
app.set('port', process.env.PORT || 3000);
app.use(cors({
  origin: `${process.env.URL_FRONTEND}`,
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
//Middlewares
app.use(express.json());
//Rutas
app.use('/api', routerAdmin)
app.use('/api', routerTecnicos)
app.use('/api', routerClientes)
app.use('/api', routerTickets)
//Ruta no encontrada
app.use((req, res) => {
    res.status(404).json({ mensaje: "Ruta no encontrada" });
});
//Inicializar el servidor
app.listen(app.get('port'),()=>{
    console.log(`Servidor funcionando: http://localhost:${app.get('port')}`);
    connection();
});
export default app;