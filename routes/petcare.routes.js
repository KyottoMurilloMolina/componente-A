import { Router } from 'express';

import {
  getAllPetCare,
  getPetCareById,
  postPetCare,
  putPetCare,
  deletePetCare,
  getPetCareByCategoria
} from '../controllers/petcare.controllers.js';

const petcare = Router();

petcare.get('/', getAllPetCare);
petcare.post('/', postPetCare);
petcare.get('/categoria/:categoria', getPetCareByCategoria);
petcare.get('/:id', getPetCareById);
petcare.put('/:id', putPetCare);
petcare.delete('/:id', deletePetCare);

export default petcare;