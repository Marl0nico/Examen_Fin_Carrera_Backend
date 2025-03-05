import mongoose, {Schema, model} from 'mongoose';
import bcrypt from 'bcryptjs';
const adminSchema = new Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        fecha: {
            type: Date,
            default: Date.now()
        },
        celular: {
            type: Number,
            required: false,
            trim: true
        },
        cedula: {
            type: Number,
            required: true,
            unique: true,
            trim: true
        }
        ,
        rol: {
            type: String,
            default: 'Admin'
        },
        activo: {
            type: Boolean,
            default: true
        },
    },
    {
        timestamps: true
    }
)
//Encriptar la contraseña
adminSchema.methods.encriptarPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash;
}
//Comparar la contraseña
adminSchema.methods.compararPassword = async function (password) {
    const response = await bcrypt.compare(password, this.password);
    return response;
}
//Generar un token
adminSchema.methods.generarToken = function () {
    const token = this.token=Math.random().toString(36).slice(2);
    return token;
}
export default model('Admin', adminSchema);