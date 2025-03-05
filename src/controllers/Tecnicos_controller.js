import mongoose from "mongoose";
import Tecnicos from "../models/Tecnicos.js";
//Crear un usuario
const crearUsuario = async (req, res) => {
    const { nombre, apellido, email, celular, cedula, fecha_nacimiento, genero, ciudad, direccion } = req.body;
    if (Object.values(req.body).includes(""))
        return res.status(400).json({ msg: "Por favor, complete todos los campos" });
    const verificarEmail = await Tecnicos.findOne({ email });
    if (verificarEmail)
        return res.status(400).json({ msg: "El email ya se encuentra registrado" });
    const nuevoUsuario = new Tecnicos({ nombre, apellido, email, celular, cedula, fecha_nacimiento, genero, ciudad, direccion});
    await nuevoUsuario.save();
    res.status(200).json({ msg: "Usuario registrado correctamente" });
}
//Ver todos los usuarios
const verUsuarios = async (req, res) => {
    const usuarios = await Tecnicos.find({estado: true}).select("-password -__v -createdAt -updatedAt");
    res.status(200).json(usuarios);
}
//Ver un usuario
const verUsuario = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ msg: "No existe un usuario con ese ID" });
    const usuario = await Tecnicos.findById(id).select("-password -__v -createdAt -updatedAt");
    if (!usuario)
        return res.status(404).json({ msg: "No existe un usuario con ese ID" });   
    res.status(200).json(usuario);
}
//Actualizar un usuario
const actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ msg: "No existe un usuario con ese ID" });
    const { nombre, apellido, email, celular, cedula, fecha_nacimiento } = req.body;
    if (Object.values(req.body).includes(""))
        return res.status(400).json({ msg: "Por favor, complete todos los campos" });
    const usuario = await Tecnicos.findByIdAndUpdate(id, { nombre, apellido, email, celular, cedula, fecha_nacimiento });
    res.status(200).json({ msg: "Usuario actualizado correctamente" });
}
//Eliminar un usuario
const eliminarUsuario = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ msg: "No existe un usuario con ese ID" });
    await Tecnicos.findByIdAndDelete(id);
    res.status(200).json({ msg: "Usuario eliminado correctamente" });
}
export {
    crearUsuario,
    verUsuarios,
    verUsuario,
    actualizarUsuario,
    eliminarUsuario
}