var mongoose = require('mongoose');
var u = require('../utils');

var moradorSchema = new mongoose.Schema({
    nome: String,
    cpf: { type: String, unique: true },
    apto: Number,
    bloco: String,
    dtNascimento: Date,
    tel: {
	residencial: String,
	movel: String,
	comercial: String,
    },
    email: String,
    obs: String,
    foto: Buffer
});

var M = mongoose.model('Morador', moradorSchema);

[
    { nome: 'Abelardo', cpf: '11100011122', apto: 101, bloco: 'B'},
    { nome: 'Berenice', cpf: '19109019129', apto: 215, bloco: 'A'},
    { nome: 'Clodoaldo', cpf: '11900911922', apto: 171, bloco: 'A'},
    { nome: 'Dorotéia', cpf: '91190091192', apto: 301, bloco: 'C'}
].forEach(function(m) {
    var model = new M();
    u.objetoExtends(model, m);
    model.save();
});

module.exports = M;
