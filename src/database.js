import mongoose from 'mongoose';
mongoose.set('strictQuery', true)
const connection = async () => {
    try {
        const {connection} = await mongoose.connect(process.env.MONGODB_URI_PRODUCTION)
        console.log(`Conectado a la base de datos ${connection.host} - ${connection.port}`);
    } catch (error) {
        console.log(`Error al conectar a la base de datos ${error}`);
    }
}
export default connection;