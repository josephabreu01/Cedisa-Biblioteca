const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SucursalSchema = new Schema ({
    nombre : {type : String},
    doctores : {type: Schema.Types.Array , ref:'Doctor'}
})