import dotenv from 'dotenv';
import app from './app.js';
import conectarMongoDB from './db/config.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
  await conectarMongoDB();

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
};

iniciarServidor();