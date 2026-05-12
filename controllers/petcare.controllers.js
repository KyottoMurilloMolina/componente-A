import PetCare from '../models/petcare.model.js';
import mongoose from 'mongoose';

export const getAllPetCare = async (req, res) => {
  try {
    const servicios = await PetCare.find({}, { __v: 0 });

    if (servicios.length === 0) {
      return res.status(404).json({
        msg: 'No se encontraron servicios de PetCare'
      });
    }

    return res.status(200).json({
      servicios
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al obtener los servicios',
      error
    });
  }
};

export const getPetCareById = async (req, res) => {
  const id = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        msg: 'ID no válido'
      });
    }

    const servicio = await PetCare.findById(id);

    if (!servicio) {
      return res.status(404).json({
        msg: 'Servicio no encontrado'
      });
    }

    return res.status(200).json({
      servicio
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al obtener el servicio'
    });
  }
};

export const postPetCare = async (req, res) => {
  const body = req.body;
  const servicio = new PetCare(body);

  try {
    const validationError = servicio.validateSync();

    if (validationError) {
      const errorMessages = Object.values(validationError.errors).map(
        error => error.message
      );

      return res.status(400).json({
        error: errorMessages
      });
    }

    await servicio.save();

    return res.status(201).json({
      msg: 'Servicio de PetCare guardado correctamente',
      servicio
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al guardar el servicio'
    });
  }
};

export const putPetCare = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        msg: 'ID no válido'
      });
    }

    const servicio = await PetCare.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    });

    if (!servicio) {
      return res.status(404).json({
        msg: 'Servicio no encontrado'
      });
    }

    return res.status(200).json({
      msg: 'Servicio actualizado correctamente',
      servicio
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al actualizar el servicio'
    });
  }
};

export const deletePetCare = async (req, res) => {
  const id = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        msg: 'ID no válido'
      });
    }

    const servicio = await PetCare.findByIdAndDelete(id);

    if (!servicio) {
      return res.status(404).json({
        msg: 'Servicio no encontrado'
      });
    }

    return res.status(200).json({
      msg: 'Servicio eliminado correctamente',
      servicio
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al eliminar el servicio'
    });
  }
};

export const getPetCareByCategoria = async (req, res) => {
  const { categoria } = req.params;

  try {
    const servicios = await PetCare.find({
      categoria: { $regex: categoria, $options: 'i' }
    });

    if (servicios.length === 0) {
      return res.status(404).json({
        msg: 'No se encontraron servicios con esa categoría'
      });
    }

    return res.status(200).json({
      servicios
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al buscar por categoría'
    });
  }
};