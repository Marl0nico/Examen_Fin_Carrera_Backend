import generarJWT from "../helpers/crearJWT.js";
import Admin from "../models/Admin.js";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
//Registrar un usuario
const registroAdmin = async (req, res) => {
    const { nombre, email, password, celular, cedula } = req.body;
    if (Object.values(req.body).includes(""))
        return res.status(400).json({ msg: "Por favor, complete todos los campos" });
    const verificarEmail=await Admin.findOne({email});
    if(verificarEmail)
        return res.status(400).json({msg: "El email ya se encuentra registrado"});
    const nuevoAdmin = new Admin({ nombre, email, password, celular, cedula });
    nuevoAdmin.password = await nuevoAdmin.encriptarPassword(password);
    await nuevoAdmin.save();
    res.status(200).json({ msg: "Usuario registrado correctamente" });
}
//Iniciar sesión
const login=async(req,res)=>{
    const {email, password}=req.body
    if(Object.values(req.body).includes(""))
        return res.status(404).json({msg: "Por favor, complete todos los campos"});
    const adminBDD=await Admin.findOne({email}).select("-status -__v -token -updatedAt -createdAt")
    if (!adminBDD)
        return res.status(404).json({msg: "El email no se encuentra registrado"});
    const verificarPassword=await adminBDD.compararPassword(password);
    if(!verificarPassword)
        return res.status(404).json({msg: "La contraseña es incorrecta"});
    const token=generarJWT(adminBDD._id, adminBDD.rol);
    const {nombre, teléfono, email:emailUsuario, rol, cedula, _id}=adminBDD;
    res.status(200).json({token, _id, nombre, teléfono, email: emailUsuario, rol, cedula});
}
// Mostrar datos del usuario
const perfilAdmin=async (req,res)=>{
    const {idToken}=jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);
    const adminBDD=await Admin.findById(idToken).select("-status -__v -token -updatedAt -createdAt");
    const {nombre, teléfono, email, rol, cedula, _id}=adminBDD;
    res.status(200).json({nombre, teléfono, email, rol, cedula, _id});
}
export {
    registroAdmin,
    login,
    perfilAdmin
}