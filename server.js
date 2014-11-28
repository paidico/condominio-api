// setup
// ####################

// packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// persistência
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/condominio');

// modelo
var Usuario = require('./app/models/usuario');
var Erro = require('./app/models/erro');

// utils
var utils = require('.app/utils');

// body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// port
var port = process.env.PORT || 8086;

// express Router
var router = express.Router();

// route GET /
router.get('/', function(req, res) {
    res.json({ message: 'API de Condomínio funcionando' });
});

// routes /usuarios
router.route('/usuarios')

    .post(function(req, res) {
	// POST /api/usuarios

	var usuario = new Usuario();
	utils.objetoExtends(usuario, req.body.usuario);
	usuario.save(function(err) {
	    var resposta = { msg: 'Usuário criado com sucesso.' };
	    if(err) {
		resposta = new Erro('PERSIST_USUARIO');
	    }
	    res.json(resposta);
	});
    });

// registro de rotas
// ####################
app.use('/api', router);

// start do server
// ####################
app.listen(port);
console.log('API de Condomínio iniciada em ' + port);
