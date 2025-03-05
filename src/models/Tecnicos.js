import mongoose, {Schema, model} from "mongoose";
const tecnicoSchema = new Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        apellido: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
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
        },
        fecha_nacimiento: {
            type: Date,
            required: true
        },
        genero: {
            type: String,
            required: false
        },
        ciudad: {
            type: String,
            required: false
        },
        direccion: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)
export default model('Tecnicos', tecnicoSchema);