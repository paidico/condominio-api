var mongoose = require('mongoose');
var u = require('../utils');

var funcionarioSchema = new mongoose.Schema({
    nome: String,
    cpf: { type: String, unique: true },
    endereco: String,
    dtNascimento: Date,
    tel: {
	residencial: String,
	movel: String
    },
    dtContratacao: Date,
    dtDemissao: Date,
    obs: String,
    email: String,
    foto: String
});

var F = mongoose.model('Funcionario', funcionarioSchema);

[{ 
    dtNascimento: new Date(1962, 10, 19), 
    dtContratacao: new Date(2000, 10, 21), 
    email: 'luisinho@condominio.com.br', 
    nome: 'Luís', cpf: '11100011125', 
    endereco: 'Rua Amarela, 142 São Paulo - SP',
    tel: { residencial: '11 1257-2521', movel: '11 9 8531-0201' }
},
 { 
     dtNascimento: new Date(1972, 11, 1), 
     dtContratacao: new Date(1992, 9, 9), 
     dtDemissao: new Date(2013, 5, 11), 
     email: 'huguinho@condominio.com.br', 
     nome: 'Hugo', cpf: '11100011123', 
     endereco: 'Rua Azul, 32 São Paulo - SP',
     tel: { residencial: '11 1357-7531', movel: '11 9 7531-0001' },
     obs: 'Demitido por justa causa.'
 },
 { 
     dtNascimento: new Date(1980, 8, 5), 
     dtContratacao: new Date(1996, 5, 1), 
     email: 'zezinho@condominio.com.br', 
     nome: 'José', cpf: '11100011124', 
     endereco: 'Rua Vermelha, 104 São Paulo - SP',
     tel: { residencial: '11 4354-7731', movel: '11 9 9539-2239' }
 }].forEach(function(f) {
     var model = new F();
     u.objetoExtends(model, f);
     model.save();
 });

module.exports = F;
