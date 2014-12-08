var uuid = require('node-uuid');

module.exports = function(app, 
			  router, 
			  Usuario, 
			  Morador, 
			  Funcionario, 
			  Autorizada,
			  Reclamacao,
			  Erro, 
			  utils) {
    var autenticar = function(req, res, autoriza, callback) {
	var chave = utils.extractKey(req.headers);
	if(!chave) {
	    res.json(new Erro('ERR_AUTEN'));
	    return;
	}
	Usuario.where('chave.expiracao').gt(Date.now())
	    .findOne({ 
		'_id': chave.usuario, 
		'chave.codigo': chave.codigo,
		'ativo': true
	    }, function(err, user) {
		if(err || !user) {
		    res.json(new Erro('ERR_AUTEN'));
		    return;
		}
		if(autoriza && autoriza !== user.tipo) {
		    res.json(new Erro('ERR_AUTOR'));
		    return;
		}
		user.chave.expiracao = Date.now() + 1800000;
		user.save(callback);
	    });
    };

    router.get('/', function(req, res) {
	// GET /

	res.json({ message: 'API de Condomínio no ar.' });
    });

    // routes /moradores
    router.route('/moradores')
	.post(function(req, res) {
            // POST /api/moradores

	    var mdr = req.body.morador;
	    if(!mdr) {
		res.json(new Erro('ERR_PARAM'));
		return;
	    }
	    autenticar(req, res, 'ADM', function() {
		var morador = new Morador();

		utils.objetoExtends(morador, mdr);
		morador.save(function(err) {
		    if(err) {
			var _err = new Erro('ERR_GEMDR');
			_err.stacktrace = err;
			res.json(_err);
			return;
		    }
		    res.json({
			sucesso: true,
			msg: 'Criação realizada com sucesso.'
		    });			   
		});
	    });
	})
	.get(function(req, res) {
	    // GET /api/moradores

	    // autenticação
	    autenticar(req, res, null, function() {
		Morador.find(function(err, moradores) {
		    if(err) {
			res.json(new Erro('ERR_LSMDR'));
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

    // routes /moradores/search
    router.route('/moradores/search')
	.post(function(req, res) {
	    // POST /api/moradores/search

	    var termo = req.body.termo;
	    if(!termo) {
		res.json(new Erro('ERR_PARAM'));
		return;
	    }
	    // autenticação
	    autenticar(req, res, null, function() {
		Morador.find()
		    .or([
			{ 'nome': new RegExp('^.*(?=' + termo + ').*$') }, 
			{ 'cpf': new RegExp('^' + termo) }
		    ])
		    .find(function(err, moradores) {
			if(err) {
			    res.json(new Erro('ERR_PSMDR'));
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

    // routes /moradores/:morador_id
    router.route('/moradores/:morador_id')
	.delete(function(req, res) {
	    // DELETE /api/moradores/id

	    // autenticação / autorização
	    autenticar(req, res, 'ADM', function() {
		Morador.remove({ 
		    _id: req.params.morador_id 
		}, function(err, morador) {
		    if(err) {
			res.json(new Erro('ERR_REMDR'));
			return;
		    }
		    res.json({
			sucesso: true,
			msg: 'Exclusão realizada com sucesso.'
		    });			    
		});
	    })
	})
	.put(function(req, res) {
	    // PUT /api/moradores/id

	    // autenticação / autorização
	    autenticar(req, res, 'ADM', function() {
		Morador.findById(req.params.morador_id, function(err, mdr) {
		    if(err) {
			res.json(new Erro('ERR_EDMDR'));
			return;
		    }
		    utils.objetoExtends(mdr, req.body.morador);
		    mdr.save(function(err) {
			if(err) {
			    res.json(new Erro('ERR_EDMDR'));
			    return;
			}
			res.json({
			    sucesso: true,
			    msg: 'Alteração realizada com sucesso.'
			});			    
		    });
		});

	    });	      
	});

    // routes /usuarios
    router.route('/usuarios')
	.get(function(req, res) {
	    // GET /api/usuarios

	    // autenticação / autorização
	    autenticar(req, res, 'ADM', function() {
		Usuario.find(function(err, usuarios) {
		    if(err) {
			res.json(new Erro('ERR_LSUSR'));
			return;
		    } 
		    res.json({
			sucesso: true,
			msg: 'Listagem realizada com sucesso.',
			usuarios: usuarios
		    });			    
		});
	    });
	});

    // routes /usuarios/:usuario_id
    router.route('/usuarios/:usuario_id')
	.put(function(req, res) {
	    // PUT /api/usuarios/id

	    // autenticação / autorização
	    autenticar(req, res, 'ADM', function() {
		Usuario.findById(req.params.usuario_id, function(err, usr) {
		    if(err) {
			res.json(new Erro('ERR_EDUSR'));
			return;
		    }
		    utils.objetoExtends(usr, req.body.usuario);
		    usr.save(function(err) {
			if(err) {
			    res.json(new Erro('ERR_EDUSR'));
			    return;
			}
			res.json({
			    sucesso: true,
			    msg: 'Alteração realizada com sucesso.'
			});			    
		    });
		});

	    });	      
	});

    // routes /funcionarios
    router.route('/funcionarios')
	.post(function(req, res) {
            // POST /api/funcionarios

	    var fnc = req.body.funcionario;
	    if(!fnc) {
		res.json(new Erro('ERR_PARAM'));
		return;
	    }
	    autenticar(req, res, 'ADM', function() {
		var funcionario = new Funcionario();

		utils.objetoExtends(funcionario, fnc);
		funcionario.save(function(err) {
		    if(err) {
			var _err = new Erro('ERR_GEFNC');
			_err.stacktrace = err;
			res.json(_err);
			return;
		    }
		    res.json({
			sucesso: true,
			msg: 'Criação realizada com sucesso.'
		    });			   
		});
	    });
	})
	.get(function(req, res) {
	    // GET /api/funcionarios

	    // autenticação / autorização
	    autenticar(req, res, 'ADM', function() {
		Funcionario.find(function(err, funcionarios) {
		    if(err) {
			res.json(new Erro('ERR_LSFNC'));
			return;
		    } 
		    res.json({
			sucesso: true,
			msg: 'Listagem realizada com sucesso.',
			funcionarios: funcionarios
		    });			    
		});
	    });
	});

    // routes /funcionarios/search
    router.route('/funcionarios/search')
	.post(function(req, res) {
	    // POST /api/funcionarios/search

	    var termo = req.body.termo;
	    if(!termo) {
		res.json(new Erro('ERR_PARAM'));
		return;
	    }
	    // autenticação
	    autenticar(req, res, 'ADM', function() {
		Funcionario.find()
		    .or([
			{ 'nome': new RegExp('^.*(?=' + termo + ').*$') }, 
			{ 'cpf': new RegExp('^' + termo) }
		    ])
		    .find(function(err, funcionarios) {
			if(err) {
			    res.json(new Erro('ERR_PSFNC'));
			    return;
			} 
			res.json({
			    sucesso: true,
			    msg: 'Listagem realizada com sucesso.',
			    funcionarios: funcionarios
			});			    
		    });
	    });
	});

    // routes /funcionarios/:funcionario_id
    router.route('/funcionarios/:funcionario_id')
	.delete(function(req, res) {
	    // DELETE /api/funcionarios/id

	    // autenticação / autorização
	    autenticar(req, res, 'ADM', function() {
		Funcionario.remove({ 
		    _id: req.params.funcionario_id 
		}, function(err, funcionario) {
		    if(err) {
			res.json(new Erro('ERR_REFNC'));
			return;
		    }
		    res.json({
			sucesso: true,
			msg: 'Exclusão realizada com sucesso.'
		    });			    
		});
	    })
	})
	.put(function(req, res) {
	    // PUT /api/funcionarios/id

	    // autenticação / autorização
	    autenticar(req, res, 'ADM', function() {
		Funcionario.findById(req.params.funcionario_id, function(err, fnc) {
		    if(err) {
			res.json(new Erro('ERR_EDFNC'));
			return;
		    }
		    utils.objetoExtends(fnc, req.body.funcionario);
		    fnc.save(function(err) {
			if(err) {
			    res.json(new Erro('ERR_EDFNC'));
			    return;
			}
			res.json({
			    sucesso: true,
			    msg: 'Alteração realizada com sucesso.'
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
		if(user && user.ativo && user.validaPassword(_usr.password)) {
		    user.chave = {
			codigo: uuid.v1(),
			expiracao: Date.now() + 1800000
		    };
		    var resposta = {
			sucesso: true,
			msg: 'Autenticação realizada com sucesso.',
			usuario: {
			    id: user._id,
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
		usuario.chave = { };
		usuario.ativo = false;

		usuario.save(function(err) {
		    var resposta = { 
			msg: 'Cadastro efetuado. Aguarde a aprovação de um administrador.',
			sucesso: true
		    };
		    if(err) {
			resposta = new Erro('ERR_SGNUP');
		    }
		    res.json(resposta);
		});
	    });
	});

    // routes /autorizadas
    router.route('/autorizadas')
	.post(function(req, res) {
            // POST /api/autorizadas

	    var atz = req.body.autorizada;
	    if(!atz) {
		res.json(new Erro('ERR_PARAM'));
		return;
	    }
	    autenticar(req, res, 'ADM', function() {
		var autorizada = new Autorizada();

		utils.objetoExtends(autorizada, atz);
		autorizada.save(function(err) {
		    if(err) {
			var _err = new Erro('ERR_GEATZ');
			_err.stacktrace = err;
			res.json(_err);
			return;
		    }
		    res.json({
			sucesso: true,
			msg: 'Criação realizada com sucesso.'
		    });			   
		});
	    });
	})
	.get(function(req, res) {
	    // GET /api/autorizadas

	    // autenticação
	    autenticar(req, res, null, function() {
		Autorizada.find(function(err, autorizadas) {
		    if(err) {
			res.json(new Erro('ERR_LSATZ'));
			return;
		    } 
		    res.json({
			sucesso: true,
			msg: 'Listagem realizada com sucesso.',
			autorizadas: autorizadas
		    });			    
		});
	    });
	});

    // routes /autorizadas/search
    router.route('/autorizadas/search')
	.post(function(req, res) {
	    // POST /api/autorizadas/search

	    var termo = req.body.termo;
	    if(!termo) {
		res.json(new Erro('ERR_PARAM'));
		return;
	    }
	    // autenticação
	    autenticar(req, res, null, function() {
		Autorizada.find()
		    .or([
			{ 'nome': new RegExp('^.*(?=' + termo + ').*$') }, 
			{ 'cpf': new RegExp('^' + termo) }
		    ])
		    .find(function(err, autorizadas) {
			if(err) {
			    res.json(new Erro('ERR_PSATZ'));
			    return;
			} 
			res.json({
			    sucesso: true,
			    msg: 'Listagem realizada com sucesso.',
			    autorizadas: autorizadas
			});			    
		    });
	    });
	});

    // routes /autorizadas/:autorizada_id
    router.route('/autorizadas/:autorizada_id')
	.delete(function(req, res) {
	    // DELETE /api/autorizadas/id

	    // autenticação / autorização
	    autenticar(req, res, 'ADM', function() {
		Autorizada.remove({ 
		    _id: req.params.autorizada_id 
		}, function(err, autorizada) {
		    if(err) {
			res.json(new Erro('ERR_REATZ'));
			return;
		    }
		    res.json({
			sucesso: true,
			msg: 'Exclusão realizada com sucesso.'
		    });			    
		});
	    })
	})
	.put(function(req, res) {
	    // PUT /api/autorizadas/id

	    // autenticação / autorização
	    autenticar(req, res, 'ADM', function() {
		Autorizada.findById(req.params.autorizada_id, function(err, atz) {
		    if(err) {
			res.json(new Erro('ERR_EDATZ'));
			return;
		    }
		    utils.objetoExtends(atz, req.body.autorizada);
		    atz.save(function(err) {
			if(err) {
			    res.json(new Erro('ERR_EDATZ'));
			    return;
			}
			res.json({
			    sucesso: true,
			    msg: 'Alteração realizada com sucesso.'
			});			    
		    });
		});

	    });	      
	});


    // routes /reclamacoes
    router.route('/reclamacoes')
	.post(function(req, res) {
            // POST /api/reclamacoes

	    var atz = req.body.reclamacao;
	    if(!atz) {
		res.json(new Erro('ERR_PARAM'));
		return;
	    }
	    autenticar(req, res, 'ADM', function() {
		var reclamacao = new Reclamacao();

		utils.objetoExtends(reclamacao, atz);
		reclamacao.save(function(err) {
		    if(err) {
			var _err = new Erro('ERR_GERCL');
			_err.stacktrace = err;
			res.json(_err);
			return;
		    }
		    res.json({
			sucesso: true,
			msg: 'Criação realizada com sucesso.'
		    });			   
		});
	    });
	})
	.get(function(req, res) {
	    // GET /api/reclamacoes

	    // autenticação
	    autenticar(req, res, null, function() {
		Reclamacao.find(function(err, reclamacoes) {
		    if(err) {
			res.json(new Erro('ERR_LSRCL'));
			return;
		    } 
		    res.json({
			sucesso: true,
			msg: 'Listagem realizada com sucesso.',
			reclamacoes: reclamacoes
		    });			    
		});
	    });
	});

    // routes /reclamacoes/:reclamacao_id
    router.route('/reclamacoes/:reclamacao_id')
	.delete(function(req, res) {
	    // DELETE /api/reclamacoes/id

	    // autenticação / autorização
	    autenticar(req, res, 'ADM', function() {
		Reclamacao.remove({ 
		    _id: req.params.reclamacao_id 
		}, function(err, reclamacao) {
		    if(err) {
			res.json(new Erro('ERR_RERCL'));
			return;
		    }
		    res.json({
			sucesso: true,
			msg: 'Exclusão realizada com sucesso.'
		    });			    
		});
	    })
	})
	.put(function(req, res) {
	    // PUT /api/reclamacoes/id

	    // autenticação / autorização
	    autenticar(req, res, 'ADM', function() {
		Reclamacao.findById(req.params.reclamacao_id, function(err, atz) {
		    if(err) {
			res.json(new Erro('ERR_EDRCL'));
			return;
		    }
		    utils.objetoExtends(atz, req.body.reclamacao);
		    atz.save(function(err) {
			if(err) {
			    res.json(new Erro('ERR_EDRCL'));
			    return;
			}
			res.json({
			    sucesso: true,
			    msg: 'Alteração realizada com sucesso.'
			});			    
		    });
		});

	    });	      
	});


    // registro de rotas
    // ####################
    app.use('/api', router);
};
