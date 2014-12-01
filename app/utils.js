module.exports = {
    objetoExtends: function(base, extensao) {
	for(var p in extensao) {
	    if(extensao.hasOwnProperty(p)) {
		base[p] = extensao[p];
	    }
	}
    },
    extractKey: function(header) {
	var h = null, hArray = null;
	if(header 
	   && (h = header['x-chave-usuario'])
	   && ((hArray = h.split(','))).length == 2 ) {
	    return {
		codigo: hArray[1],
		usuario: hArray[0]
	    };
	}
    }
};