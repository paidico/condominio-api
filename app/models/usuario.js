var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var usuarioSchema = mongoose.Schema({
    username: String,
    password: String,
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

module.exports = mongoose.model('Usuario', usuarioSchema);
