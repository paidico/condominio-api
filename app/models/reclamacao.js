var mongoose = require('mongoose');
var u = require('../utils');

var reclamacaoSchema = new mongoose.Schema({
    nome: String,
    apto: Number,
    bloco: String,
    dt: Date,
    descricao: String,
    situacao: String,
    resolvedor: String
});

module.exports = mongoose.model('Reclamacao', reclamacaoSchema);
