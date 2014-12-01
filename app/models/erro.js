module.exports = function(erro) {
    var enumerador = {
	ERR_DESCN: 'Erro desconhecido.',
	ERR_SGNUP: 'Falha ao gravar usuário.',
	ERR_SGNIN: 'Falha ao validar usuário.',
	ERR_NOUSR: 'Usuário e/ou senha inválidos.',
	ERR_PARAM: 'Falha ao identificar parâmetros.',
	ERR_EXUSR: 'Usuário já existe.',
	ERR_GEMDR: 'Falha ao listar moradores.',
	ERR_AUTEN: 'Falha de autenticação.',
	ERR_AUTOR: 'Falha de autorização.'
    };
    erro = enumerador[erro] ? erro : 'ERR_DESCN';
    this.msg = enumerador[erro];
    this.codigo = erro;
};
