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
    foto: String
});

var M = mongoose.model('Morador', moradorSchema);

[
    { dtNascimento: new Date(1942, 10, 19), email: 'abelardo@condominio.com.br', nome: 'Abelardo', cpf: '11100011122', apto: 101, bloco: 'B'},
    { dtNascimento: new Date(1943, 5, 6), email: 'berenice@condominio.com.br', nome: 'Berenice', cpf: '19109019129', apto: 215, bloco: 'A'},
    { dtNascimento: new Date(1952, 0, 16), email: 'clodoaldo@condominio.com.br', nome: 'Clodoaldo', cpf: '11900911922', apto: 171, bloco: 'A'},
    { dtNascimento: new Date(1944, 5, 2), email: 'doroteia@condominio.com.br', nome: 'Dorotéia', cpf: '91190091192', apto: 301, bloco: 'C'},
    { dtNascimento: new Date(1932, 6, 3), email: 'etevaldo@condominio.com.br', nome: 'Etevaldo', cpf: '91190091193', apto: 302, bloco: 'C'}
].forEach(function(m) {
    var model = new M();
    u.objetoExtends(model, m);
    model.save();
});

module.exports = M;
