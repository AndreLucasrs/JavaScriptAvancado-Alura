class NegociacaoController{

	constructor(){
		//Se declaramos as variáveis usando o let, estas ganharam um escopo de bloco	
		//estamos informando que o querySelector irá para a variável $, mas ainda manterá uma associação com document
		let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade =  $('#quantidade');
        this._inputValor = $('#valor');
        //this tem contexto dinamico, ira variar de acordo com o que esta chamando
        //essa função abaixo tem escopo dinamico logo o this acontece o que ta escrito acima
        //para esse this funciona de acordo com o contexto de NegociacaoController
        //eu adicionei este parametro antes this, para mostrar qual é o contexto
        //this._listaNegociacoes = new ListaNegociacoes(this, function(model) {
		//mas tem como resolver com arrow function
		// Isto ocorre porque a arrow function não é apenas uma maneira sucinta de escrever uma função,
		//ela também tem um característica peculiar: o escopo de this é léxico,
		//em vez de ser dinâmico como a outra função. 
		//Isto significa que o this não mudará de acordo com o contexto
        this._listaNegociacoes = new ListaNegociacoes((model) =>
         	this._negociacoesView.update(model));

        this._negociacoesView = new NegociacoesView($("#negociacoesView"));
        this._negociacoesView.update(this._listaNegociacoes);
        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($("#mensagemView"));
        this._mensagemView.update(this._mensagem);

	}

	adiciona(event){
		//isso cancela a atualização da pagina na hora de submeter
		event.preventDefault();

        this._listaNegociacoes.adiciona(this._criaNegociacao());

        this._mensagem.texto = "Negociação adicionada com sucesso";
        this._mensagemView.update(this._mensagem);

        this._limpaFormulario();
	}

	apaga(){

		  this._listaNegociacoes.esvazia();

		  this._mensagem.texto = 'Negociações apagadas com sucesso';
		  this._mensagemView.update(this._mensagem);
	}

	_criaNegociacao(){
		return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
	}

	//o uso do underline _ ,que dizer que esse metodo so pode ser chamado pela propria classe,
	//nesse caso NegociacaoController
	_limpaFormulario(){

		this._inputData.value = '';
		this._inputQuantidade.value = 1;
		this._inputValor.value = 0.0;

		this._inputData.focus();
	}
}