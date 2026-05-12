import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false;

const conectarMongoDB = async () => {

    if (isConnected) {
        console.log('Ya estás conectado a MongoDB');
        return;
    }

    try {

        await mongoose.connect(process.env.MONGODB_URI);

        isConnected = true;

        console.log('Conexión a MongoDB exitosa');

    } catch (error) {

        console.error('Error al conectar a MongoDB', error);

    }

};

const db = mongoose.connection;

db.on('error', (error) => {

    isConnected = false;

    console.error('Error en la conexión a MongoDB', error);

});

db.once('open', () => {

    isConnected = true;

});

db.on('disconnected', () => {

    isConnected = false;

    console.warn('Conexión a MongoDB perdida');

});

process.on('SIGINT', async () => {

    await mongoose.connection.close();

    console.log('Desconectado de MongoDB');

    process.exit(0);

});

export default conectarMongoDB;