const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CitaSchema = new Schema({
    paciente: { type: Object },
    estudios: { type: Array },
    duracionCita: { type: Date },
    inicioCita: { type: Date },
    finCita: { type: Date},
    representante: { type: Object },
    sucursal: { type: Object },
    creado: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Cita',CitaSchema);