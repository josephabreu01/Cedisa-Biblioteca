const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({

    nombre: { type: String },
    especialidad:{type: String},
    sucursal: { type: Schema.Types.Array, ref:'Sucursal' },
    estudios:{type: Schema.Types.Array, ref:'Estudio'}

})