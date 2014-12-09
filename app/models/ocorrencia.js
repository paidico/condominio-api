var mongoose = require('mongoose');
var u = require('../utils');

var Schema = mongoose.Schema;

var ocorrenciaSchema = new Schema({
    abridor: String,
    _funcionario: { type: Schema.Types.ObjectId, ref: 'Funcionario' },
    dt: { type: Date, default: Date.now },
    descricao: String
});

module.exports = mongoose.model('Ocorrencia', ocorrenciaSchema);
