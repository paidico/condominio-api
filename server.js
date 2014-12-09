// bootstrap setup
// ####################

// packages
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

// persistência
var configDB = require('./config/database');
var mongoose = require('mongoose');
mongoose.connect(configDB.url);

// body-parser
app.use(bodyParser.urlencoded({ limit: '7mb', extended: true }));
app.use(bodyParser.json({ limit: '7mb' }));

// porta
var port = process.env.PORT || 8086;

// rotas
// ####################

// cors com preflight
var corsOpt = { 
    credentials: true,
    origin: true,
    maxAge: 66,
    methods: [ 'GET', 'POST', 'DELETE', 'PUT', 'OPTIONS', 'HEAD', 'PATCH' ]
};
app.use(cors(corsOpt));
app.options('*', cors(corsOpt));

// página de teste
// app.use(express.static(__dirname + '/public'));

// api
require('./app/routes')(
    app, 
    express.Router(),
    require('./app/models/usuario'), 
    require('./app/models/morador'), 
    require('./app/models/funcionario'), 
    require('./app/models/autorizada'), 
    require('./app/models/reclamacao'), 
    require('./app/models/ocorrencia'), 
    require('./app/models/erro'), 
    require('./app/utils'));

// start do server
// ####################
app.listen(port);
console.log('API de Condomínio iniciada em ' + port);
