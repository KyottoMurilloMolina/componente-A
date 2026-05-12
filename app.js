import express from 'express';
import cors from 'cors';
import indexRoutes from './routes/index.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.json({
    msg: 'Servidor PetCare Backend activo',
    api: '/api'
  });
});

app.use('/api', indexRoutes);

app.use((req, res) => {
  res.status(404).json({
    msg: 'Ruta no encontrada'
  });
});

export default app;