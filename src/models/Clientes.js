import mongoose, {Schema, model} from "mongoose";
const clienteSchema=new Schema({
    nombre:{
        type:String,
        required:true,
        trim: true
    },
    apellido:{
        type:String,
        required:true,
        trim: true
    },
    email:{
        type:String,
        required:true,
        trim: true
    },
    telefono:{
        type:String,
        required:true,
        trim: true
    },
    direccion:{
        type:String,
        required: false,
        trim: true
    },
    cedula:{
        type:String,
        required:true,
        trim: true,
        unique:true
    },
    fecha_nacimiento:{
        type:Date,
        required: false
    },
    ciudad:{
        type:String,
        required:false,
        trim: true
    }
},{
    timestamps:true
})
export default model('Clientes',clienteSchema);