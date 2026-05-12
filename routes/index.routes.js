import petcare from './petcare.routes.js';
import {Router} from 'express';
const indexRoutes = Router();

indexRoutes.get('/', (req, res) => {
  res.json({
    msg: 'API PetCare funcionando correctamente',
    endpoints: {
      petcare: '/api/petcare'
    }
  });
});

indexRoutes.use('/petcare', petcare);



export default indexRoutes;