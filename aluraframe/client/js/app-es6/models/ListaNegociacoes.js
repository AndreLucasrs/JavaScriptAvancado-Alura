export class ListaNegociacoes {

	//constructor(contexto, armadilha) {
	constructor() {	

        this._negociacoes = [];
        //isso ira fazer a tela se atualizar sempre, pq o parametro passado é uma função anonima de update
        //essa armadilha sempre sera chamado no adiciona ou no esvazia
        //this._armadilha = armadilha;
        //this._contexto = contexto;
    }

    adiciona(negociacao) {

        this._negociacoes.push(negociacao);
        //o model é a instancia de listaNegociacoes esta passando quando esta sendo chamada
        //esse this dentro da armadilha esta recebendo a propria estancia de quem esta chamando-a
        //this._armadilha(this);
        //Reflect.apply(this._armadilha,this._contexto,[this]);
    }

	get negociacoes() {
		//dessa forma abaixo, que desse um get negociacao.push, conseguia adicionar um novo valor, e não apenas pegalo
		//return this._negociacoes;
		//isso estar retornando a copia do array, se vc der um push agora, vc estara inserindo valores
		//na copia da lista, e não na lista original
    	return [].concat(this._negociacoes);
	}

	esvazia(){

		 this._negociacoes =[];
		 //this._armadilha(this);
		 //Reflect.apply(this._armadilha,this._contexto,[this])
	}

    get volumeTotal() {
       return this._negociacoes.reduce((total, n) => total + n.volume, 0.0);
    }

    ordena(criterio) {
        this._negociacoes.sort(criterio);        
    }

    inverteOrdem() {
        this._negociacoes.reverse();
    }
}