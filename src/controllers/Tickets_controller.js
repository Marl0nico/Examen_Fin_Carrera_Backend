import Tickets from "../models/Tickets.js";
import mongoose from "mongoose";
import Tecnicos from "../models/Tecnicos.js";
//Crear un ticket
// const crearTicket = async (req, res) => {
//     //console.log("Datos recibidos:", req.body); // Para depuración
//     const { tecnico, cliente, descripcion } = req.body;
//     // Verificar si el tecnico ya tiene un ticket
//     if (!mongoose.Types.ObjectId.isValid(tecnico)) {
//         return res.status(400).json({ msg: "ID de tecnico no válido" });
//     }
//     const tecnicoEncontrado = await Tecnicos.findById(tecnico).select('nombre');
//         if (!tecnicoEncontrado) {
//             return res.status(404).json({ msg: "Técnico no encontrado" });
//         }
//     if (!Array.isArray(cliente) || cliente.length === 0) {
//         return res.status(400).json({ msg: "Debes registrar al menos un cliente" });
//     }
//     // Validar que todos los IDs de clientes sean válidos
//     for (const clienteId of cliente) {
//         if (!mongoose.Types.ObjectId.isValid(clienteId)){
//             return res.status(400).json({ msg: `ID de cliente no válido: ${clienteId}` });
//         }
//     }
//     try {
//         // Verificar si el tecnico ya tiene un ticket
//         const ticketExistente = await Tickets.findOne({ tecnico });
//         if (ticketExistente) {
//             // Si el tecnico ya tiene un ticket, no se puede crear uno nuevo
//             return res.status(400).json({ msg: "Ticket ya registrado" });
//         }
//         if (ticketExistente) {
//             // Verificar si algun cliente ya consta en el ticket
//             const clientesDuplicados = cliente.filter(clienteId =>
//                 ticketExistente.cliente.includes(clienteId)
//             );
//             if (clientesDuplicados.length > 0) {
//                 return res.status(400).json({ msg: "Algunos clientes ya constan en el ticket" });
                
//             }
//             // Agregar los nuevos clientes al ticket existente
//             ticketExistente.cliente.push(...cliente);
//             await ticketExistente.save();
//             return res.status(200).json({
//                 msg: "Clientes agregados correctamente",
//             });
//         }
//         // Si no existe un ticket, se crea uno nuevo
//         const nuevoTicket = new Tickets({ tecnico, cliente, descripcion });
//         const ticketConNombres = await Tickets.findById(nuevoTicket._id)
//             .populate('tecnico', 'nombre')  // Trae solo el nombre del técnico
//             .populate('clientes', 'nombre'); // Trae solo los nombres de los clientes
//         await nuevoTicket.save();
//         res.status(201).json({ msg: "Ticket creado correctamente"});
//     } catch (error) {
//         res.status(500).json({ msg: "Error al generar el ticket", error: error.message });
//     }
// };


const crearTicket = async (req, res) => {
    //console.log("Datos recibidos:", req.body); // Para depuración
    const { tecnico, cliente, descripcion } = req.body;

    // Verificar si el técnico tiene un ID válido
    if (!mongoose.Types.ObjectId.isValid(tecnico)) {
        return res.status(400).json({ msg: "ID de técnico no válido" });
    }

    // Buscar el técnico y verificar si existe
    const tecnicoEncontrado = await Tecnicos.findById(tecnico).select('nombre');
    if (!tecnicoEncontrado) {
        return res.status(404).json({ msg: "Técnico no encontrado" });
    }

    // Verificar que al menos un cliente esté registrado
    if (!Array.isArray(cliente) || cliente.length === 0) {
        return res.status(400).json({ msg: "Debes registrar al menos un cliente" });
    }

    // Validar que todos los IDs de los clientes sean válidos
    for (const clienteId of cliente) {
        if (!mongoose.Types.ObjectId.isValid(clienteId)) {
            return res.status(400).json({ msg: "ID de cliente no válido"});
        }
    }

    try {
        // Verificar si el técnico ya tiene un ticket
        const ticketExistente = await Tickets.findOne({ tecnico });
        if (ticketExistente) {
            // Si el técnico ya tiene un ticket, no se puede crear uno nuevo
            return res.status(400).json({ msg: "El técnico ya tiene un ticket registrado" });
        }

        // Crear un nuevo ticket
        const nuevoTicket = new Tickets({ tecnico, cliente, descripcion });
        await nuevoTicket.save(); // Guardar el nuevo ticket en la base de datos

        // Obtener los datos completos con populate para el técnico y los clientes
        const ticketConNombres = await Tickets.findById(nuevoTicket._id)
            .populate('tecnico', 'nombre')  // Trae solo el nombre del técnico
            .populate('cliente', 'nombre'); // Trae solo los nombres de los clientes

        // Enviar la respuesta
        res.status(201).json({ msg: "Ticket creado correctamente", ticket: ticketConNombres });
    } catch (error) {
        res.status(500).json({ msg: "Error al generar el ticket", error: error.message });
    }
};






// const crearTicket = async (req, res) => {
//     console.log("Datos recibidos:", req.body); // Para depuración
//     const { tecnico, clientes, descripcion } = req.body;

//     try {
//         // Verificar si el técnico existe y obtener su nombre
//         const tecnicoEncontrado = await Tecnicos.findById(tecnico).select('nombre');
//         if (!tecnicoEncontrado) {
//             return res.status(404).json({ msg: "Técnico no encontrado" });
//         }

//         // Verificar que se haya registrado al menos un cliente
//         if (!Array.isArray(clientes) || clientes.length === 0) {
//             return res.status(400).json({ msg: "Debes registrar al menos un cliente" });
//         }

//         // Validar que todos los IDs de clientes sean válidos
//         for (const clienteId of clientes) {
//             if (!mongoose.Types.ObjectId.isValid(clienteId)) {
//                 return res.status(400).json({ msg: `ID de cliente no válido: ${clienteId}` });
//             }
//         }

//         // Verificar si el técnico ya tiene un ticket
//         const ticketExistente = await Tickets.findOne({ tecnico: tecnico });
//         if (ticketExistente) {
//             return res.status(400).json({ msg: `El técnico ${tecnicoEncontrado.nombre} ya tiene un ticket registrado` });
//         }

//         // Crear un nuevo ticket
//         const nuevoTicket = await Tickets.create({ tecnico, clientes, descripcion });

//         // Obtener los datos completos con populate
//         const ticketConNombres = await Tickets.findById(nuevoTicket._id)
//             .populate('tecnico', 'nombre') // Trae solo el nombre del técnico
//             .populate('clientes', 'nombre'); // Trae solo los nombres de los clientes

//         res.status(201).json({ msg: "Ticket creado correctamente", ticket: ticketConNombres });
//     } catch (error) {
//         res.status(500).json({ msg: "Error al generar el ticket", error: error.message });
//     }
// };





//Ver todos los tickets
const verTickets = async (req, res) => {
    const tickets = await Tickets.find().select("-__v -createdAt -updatedAt");
    res.status(200).json(tickets);
}
//Ver un ticket
const verTicket = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ msg: "No existe un ticket con ese ID" });
    const ticket = await Tickets.findById(id).select("-__v -createdAt -updatedAt");
    if (!ticket)
        return res.status(404).json({ msg: "No existe un ticket con ese ID" });
    res.status(200).json(ticket);
}
//Actualizar un ticket
const actualizarTicket = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ msg: "No existe un ticket con ese ID" });
    const { descripcion } = req.body;
    if (Object.values(req.body).includes(""))
        return res.status(400).json({ msg: "Por favor, complete todos los campos" });
    const ticket = await Tickets.findByIdAndUpdate(id, { descripcion });
    res.status(200).json({ msg: "Ticket actualizado correctamente" });
}
//Eliminar un ticket
const eliminarTicket = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ msg: "No existe un ticket con ese ID" });
    await Tickets.findByIdAndDelete(id);
    res.status(200).json({ msg: "Ticket eliminado correctamente" });
}
export {
    crearTicket,
    verTickets,
    verTicket,
    actualizarTicket,
    eliminarTicket
}