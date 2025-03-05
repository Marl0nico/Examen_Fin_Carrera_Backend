import mongoose, {Schema, model} from "mongoose";
const ticketSchema=new Schema({
    tecnico:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Tecnicos',
        required:true,
        unique:true
    },
    cliente:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Clientes',
        required:true
    }],
    descripcion:{
        type:String,
        required:false,
        trim:true
    },
},{
    timestamps:true
})
export default model('Tickets',ticketSchema);