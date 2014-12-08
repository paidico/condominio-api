var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var u = require('../utils');

var usuarioSchema = mongoose.Schema({
    username: { type: String, unique: true, trim: true },
    password: String,
    ativo: Boolean,
    chave: {
	codigo: String,
	expiracao: Number
    },
    tipo: String
});

usuarioSchema.methods.geraHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

usuarioSchema.methods.validaPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var U = mongoose.model('Usuario', usuarioSchema);

[{ 
    username: 'chefe',
    password: '1234',
    ativo: true,
    chave: { },
    tipo: 'ADM'
}].forEach(function(usr) {
    var model = new U();
    u.objetoExtends(model, usr);
    model.password = model.geraHash(usr.password);
    model.save();
});

module.exports = U;
