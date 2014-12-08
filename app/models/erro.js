module.exports = function(erro) {
    var enumerador = {
	ERR_DESCN: 'Erro desconhecido.',
	ERR_SGNUP: 'Falha ao gravar usuário.',
	ERR_SGNIN: 'Falha ao validar usuário.',
	ERR_NOUSR: 'Usuário e/ou senha inválidos.',
	ERR_PARAM: 'Falha ao identificar parâmetros.',
	ERR_EXUSR: 'Usuário já existe.',
	ERR_LSUSR: 'Falha ao listar usuários.',
	ERR_EDUSR: 'Falha ao editar usuário.',
	ERR_LSMDR: 'Falha ao listar moradores.',
	ERR_PSMDR: 'Falha ao pesquisar moradores.',
	ERR_GEMDR: 'Falha ao incluir morador.',
	ERR_REMDR: 'Falha ao excluir morador.',
	ERR_EDMDR: 'Falha ao editar morador.',
	ERR_LSATZ: 'Falha ao listar pessoas autorizadas.',
	ERR_PSATZ: 'Falha ao pesquisar pessoas autorizadas.',
	ERR_GEATZ: 'Falha ao incluir pessoa autorizada.',
	ERR_REATZ: 'Falha ao excluir pessoa autorizada.',
	ERR_EDATZ: 'Falha ao editar pessoa autorizada.',
	ERR_LSRCL: 'Falha ao listar reclamações.',
	ERR_PSRCL: 'Falha ao pesquisar reclamações.',
	ERR_GERCL: 'Falha ao incluir reclamação.',
	ERR_RERCL: 'Falha ao excluir reclamação.',
	ERR_EDRCL: 'Falha ao editar reclamação.',
	ERR_LSFNC: 'Falha ao listar funcionários.',
	ERR_PSFNC: 'Falha ao pesquisar funcionários.',
	ERR_GEFNC: 'Falha ao incluir funcionário.',
	ERR_REFNC: 'Falha ao excluir funcionário.',
	ERR_EDFNC: 'Falha ao editar funcionário.',
	ERR_AUTEN: 'Falha de autenticação.',
	ERR_AUTOR: 'Falha de autorização.'
    };

    this.msg = enumerador[erro] || enumerador['ERR_DESCN'],
    this.codigo = erro;
};
