import mongoose from 'mongoose';

const petcareSchema = new mongoose.Schema(
  {
    nombreServicio: {
      type: String,
      required: [true, 'El nombre del servicio es obligatorio'],
      trim: true
    },
    tipoMascota: {
      type: String,
      required: [true, 'El tipo de mascota es obligatorio'],
      trim: true
    },
    categoria: {
      type: String,
      required: [true, 'La categoría es obligatoria'],
      enum: ['Baño', 'Peluquería', 'Veterinaria', 'Guardería', 'Vacunación', 'Producto']
    },
    descripcion: {
      type: String,
      required: [true, 'La descripción es obligatoria'],
      trim: true
    },
    precio: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
      min: [0, 'El precio no puede ser negativo']
    },
    duracionMinutos: {
      type: Number,
      required: [true, 'La duración es obligatoria'],
      min: [1, 'La duración debe ser mayor a 0']
    },
    disponible: {
      type: Boolean,
      default: true
    },
    veterinarioResponsable: {
      type: String,
      default: 'No asignado'
    },
    comida: {
      type: String,
      trim: true
    },
    actitud: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const PetCare = mongoose.model('PetCare', petcareSchema);

export default PetCare;