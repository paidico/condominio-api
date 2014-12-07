module.exports = function(erro) {
    var enumerador = {
	ERR_DESCN: 'Erro desconhecido',
	ERR_SGNUP: 'Falha ao gravar usuário',
	ERR_SGNIN: 'Falha ao validar usuário',
	ERR_NOUSR: 'Usuário e/ou senha inválidos',
	ERR_PARAM: 'Falha ao identificar parâmetros',
	ERR_EXUSR: 'Usuário já existe',
	ERR_LSMDR: 'Falha ao listar moradores',
	ERR_PSMDR: 'Falha ao pesquisar moradores',
	ERR_GEMDR: 'Falha ao incluir morador',
	ERR_REMDR: 'Falha ao excluir morador',
	ERR_EDMDR: 'Falha ao editar morador',
	ERR_LSFNC: 'Falha ao listar funcionários',
	ERR_PSFNC: 'Falha ao pesquisar funcionários',
	ERR_GEFNC: 'Falha ao incluir funcionário',
	ERR_REFNC: 'Falha ao excluir funcionário',
	ERR_EDFNC: 'Falha ao editar funcionário',
	ERR_AUTEN: 'Falha de autenticação',
	ERR_AUTOR: 'Falha de autorização'
    };
    erro = enumerador[erro] ? erro : 'ERR_DESCN';
    this.msg = enumerador[erro];
    this.codigo = erro;
};
