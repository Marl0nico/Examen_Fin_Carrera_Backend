import Clientes from "../models/Clientes.js";
import mongoose from "mongoose";
//Crear un cliente
const crearCliente = async (req, res) => {
    const { nombre, apellido, email, telefono, direccion, cedula, fecha_nacimiento, ciudad } = req.body;
    if (Object.values(req.body).includes(""))
        return res.status(400).json({ msg: "Por favor, complete todos los campos" });
    const verificarCliente = await Clientes.findOne({ cedula });
    if (verificarCliente)
        return res.status(400).json({ msg: "El cliente ya se encuentra registrado" });
    const nuevoCliente = new Clientes({ nombre, apellido, email, telefono, direccion, cedula, fecha_nacimiento, ciudad });
    await nuevoCliente.save();
    res.status(200).json({ msg: "Cliente registrado correctamente" });
}
//Ver todos los clientes
const verClientes = async (req, res) => {
    const clientes = await Clientes.find().select("-__v -createdAt -updatedAt");
    res.status(200).json(clientes);
}
//Ver un cliente
const verCliente = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ msg: "No existe un cliente con ese ID" });
    const cliente = await Clientes.findById(id).select("-__v -createdAt -updatedAt");
    if (!cliente)
        return res.status(404).json({ msg: "No existe un cliente con ese ID" });
    res.status(200).json(cliente);
}
//Actualizar un cliente
const actualizarCliente = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ msg: "No existe un cliente con ese ID" });
    const { nombre, apellido, email, telefono, direccion, cedula, fecha_nacimiento, ciudad  } = req.body;
    if (Object.values(req.body).includes(""))
        return res.status(400).json({ msg: "Por favor, complete todos los campos" });
    const cliente = await Clientes.findByIdAndUpdate(id, { nombre, apellido, email, telefono, direccion, cedula, fecha_nacimiento, ciudad });
    res.status(200).json({ msg: "Cliente actualizado correctamente" });
}
//Eliminar un cliente
const eliminarCliente = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ msg: "No existe un cliente con ese ID" });
    await Clientes.findByIdAndDelete(id);
    res.status(200).json({ msg: "Cliente eliminado correctamente" });
}
export {
    crearCliente,
    verClientes,
    verCliente,
    actualizarCliente,
    eliminarCliente
}
