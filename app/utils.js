module.exports = {
    objetoExtends: function(base, extensao) {
	for(var p in extensao) {
	    if(extensao.hasOwnProperty(p)) {
		base[p] = extensao[p];
	    }
	}
    }
};