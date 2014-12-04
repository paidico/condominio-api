// bootstrap setup
// ####################

// packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// persistência
var configDB = require('./config/database');
var mongoose = require('mongoose');
mongoose.connect(configDB.url);

// body-parser
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

// porta
var port = process.env.PORT || 8086;

// rotas
// ####################

// teste
app.use(express.static(__dirname + '/public'));

// api
require('./app/routes')(
    app, 
    express.Router(),
    require('./app/models/usuario'), 
    require('./app/models/morador'), 
    require('./app/models/erro'), 
    require('./app/utils'));

// start do server
// ####################
app.listen(port);
console.log('API de Condomínio iniciada em ' + port);
