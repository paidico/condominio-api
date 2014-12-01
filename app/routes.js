var uuid = require('node-uuid');

module.exports = function(app, router, Usuario, Morador, Erro, utils) {

    router.get('/', function(req, res) {
	// GET /

	res.json({ message: 'API de Condomínio no ar.' });
    });

    // routes /moradores
    router.route('/moradores')
    // .post(function(req, res) {
    //     // POST /api/moradores

    
    // })
	.get(function(req, res) {
	    // GET /api/moradores

	    // autenticação
	    var chave = utils.extractKey(req.headers);
	    if(!chave) {
		res.json(new Erro('ERR_AUTEN'));
		return;
	    }
	    Usuario.where('chave.expiracao').gt(Date.now())
		.findOne({ 
		    'username': chave.usuario, 
		    'chave.codigo': chave.codigo
		}, function(err, user) {
		    if(err || !user) {
			res.json(new Erro('ERR_AUTEN'));
			return;
		    }
		    user.chave.expiracao = Date.now() + 1800000;
		    user.save(function() {
			Morador.find(function(err, moradores) {
			    if(err) {
				res.json(new Erro('ERR_GEMDR'));
				return;
			    } 
			    res.json({
				sucesso: true,
				msg: 'Listagem realizada com sucesso.',
				moradores: moradores
			    });			    
			});
		    });
		});
	});

    // routes /login
    router.route('/login')
	.post(function(req, res) {
	    // POST /api/login

	    var _usr = req.body.usuario;
	    if(!_usr 
	       || !_usr.username 
	       || _usr.username.length < 4
	       || !_usr.password
	       || _usr.password.length < 4) {
		res.json(new Erro('ERR_PARAM'));
		return;
	    } 
	    Usuario.findOne({ username: _usr.username }, function(err, user) {
		if(err) {
		    res.json(new Erro('ERR_SGNIN'));
		    return;
		} 
		if(user && user.validaPassword(_usr.password)) {
		    user.chave = {
			codigo: uuid.v1(),
			expiracao: Date.now() + 1800000
		    };
		    var resposta = {
			sucesso: true,
			msg: 'Autenticação realizada com sucesso.',
			usuario: {
			    username: user.username,
			    tipo: user.tipo,
			    chave: user.chave
			}
		    };
		    user.save(function() {
			res.json(resposta);
		    });
		    return;
		} 
		res.json(new Erro('ERR_NOUSR'));
	    })
	    
	});

    // routes /signup
    router.route('/signup')
	.post(function(req, res) {
	    // POST /api/signup

	    var _usr = req.body.usuario;
	    if(!_usr 
	       || !_usr.username 
	       || _usr.username.length < 4
	       || !_usr.password
	       || _usr.password.length < 4) {
		res.json(new Erro('ERR_PARAM'));
		return;
	    } 
	    Usuario.findOne({ username: _usr.username }, function(err, user) {
		if(err) {
		    res.json(new Erro('ERR_SGNUP'));
		    return;
		} 
		if(user) {
		    res.json(new Erro('ERR_EXUSR'));
		    return;
		}
		var usuario = new Usuario();
		utils.objetoExtends(usuario, _usr);
		usuario.password = usuario.geraHash(_usr.password);
		usuario.chave = {
		    codigo: uuid.v1(),
		    expiracao: Date.now() + 1800000
		};
		usuario.save(function(err) {
		    var resposta = { 
			msg: 'Usuário criado com sucesso.',
			sucesso: true,
			usuario: {
			    username: usuario.username,
			    tipo: usuario.tipo,
			    chave: usuario.chave
			}
		    };
		    if(err) {
			resposta = new Erro('ERR_SGNUP');
		    }
		    res.json(resposta);
		});
	    });
	});

    // registro de rotas
    // ####################
    app.use('/api', router);
};
