const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongooseAlgolia = require('mongoose-algolia');

const EstudiosSchema = new Schema({
  categoria: { type: Schema.Types.ObjectId, ref: 'Categoria' },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  doctores: { type: Schema.Types.Array, ref: 'Doctor' },
  sucursales: { type: Schema.Types.Array, ref: 'Sucursal' },
  titulo: String,
  descripcion: String,
  precio: Number,
  creado: { type: Date, default: Date.now }
})

// EstudiosSchema.plugin(mongooseAlgolia, {
//   appId: 'PIQ9925HKD',
//   apiKey: '689de093f04dc66fe2b6b0a70ac151d1',
//   indexName: 'biblioteca',
//   selector: '_id titulo owner descripcion precio categoria creado',
//   populate: {
//     path: 'owner categoria',
//     select: '   '
//   },
//   defaults: {
//     author: 'uknown'
//   },
//   mappings: {
//     title: function (value) {
//       return `${value}`
//     }
//   },
//   virtuals: {},
//   debug: true
// });

// let Modelo = mongoose.model('Estudio', EstudiosSchema);
// Modelo.SyncToAlgolia();
// Modelo.SetAlgoliaSettings({
//   searchableAttributes: ['titulo', 'categoria', 'precio']
// });

module.exports = mongoose.model('Estudio', EstudiosSchema);