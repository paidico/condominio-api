var mongoose = require('mongoose');
var u = require('../utils');

var autorizadaSchema = new mongoose.Schema({
    nome: String,
    cpf: { type: String, unique: true },
    celular: String,
    dtInicial: Date,
    dtFinal: Date,
    autorizador: String,
    apto: Number,
    bloco: String,
    contato: String
});

var A = mongoose.model('Autorizada', autorizadaSchema);

[{ 
    nome: 'Mickey',
    cpf: '99933366600',
    celular: '11 9 9633-3366',
    dtInicial: new Date(2013, 11, 1), 
    dtFinal: new Date(2015, 0, 1),
    autorizador: 'Pateta',
    apto: 432,
    bloco: 'D',
    contato: '11 9 9833-3388'

}].forEach(function(f) {
     var model = new A();
     u.objetoExtends(model, f);
     model.save();
 });

module.exports = A;
