const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    nombre : {type: String , unique: true, lowercase: true},
    creado: {type: Date, default: Date.now}
}); 

module.exports = mongoose.model('Categoria', CategorySchema);