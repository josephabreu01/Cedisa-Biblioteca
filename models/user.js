const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs')

const UserSchema = new Schema({
    email: {type: String , unique: true, lowercase: true},
    nombre: String,
    contrasena: String,
    esAdministrador: {type:Boolean},
    created:{ type:Date, default: Date.now}
})


UserSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('contrasena')) return next();

    bcrypt.hash(user.contrasena, null , null , function (err, has) {
        if (err) return next(err);

        user.contrasena = has;
        next();
    });
});


UserSchema.methods.compareContrasena = function (contrasena) {
    return bcrypt.compareSync(contrasena,this.contrasena)
};


module.exports = mongoose.model('User', UserSchema);

