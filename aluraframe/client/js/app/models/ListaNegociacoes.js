class ListaNegociacoes {

	constructor() {

        this._negociacoes = [];
    }

    adiciona(negociacao) {

        this._negociacoes.push(negociacao);
    }

	get negociacoes() {
		//dessa forma abaixo, que desse um get negociacao.push, conseguia adicionar um novo valor, e não apenas pegalo
		//return this._negociacoes;
		//isso estar retornando a copia do array, se vc der um push agora, vc estara inserindo valores
		//na copia da lista, e não na lista original
    	return [].concat(this._negociacoes);
	}

}