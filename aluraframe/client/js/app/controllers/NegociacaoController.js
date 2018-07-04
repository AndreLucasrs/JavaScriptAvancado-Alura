class NegociacaoController{

	constructor(){
		//Se declaramos as variáveis usando o let, estas ganharam um escopo de bloco	
		//estamos informando que o querySelector irá para a variável $, mas ainda manterá uma associação com document
		let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade =  $('#quantidade');
        this._inputValor = $('#valor');
        this._listaNegociacoes = new ListaNegociacoes();
        this._negociacoesView = new NegociacoesView($("#negociacoesView"));
        this._negociacoesView.update(this._listaNegociacoes);
		
	}

	adiciona(event){
		//isso cancela a atualização da pagina na hora de submeter
		event.preventDefault();

        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._negociacoesView.update(this._listaNegociacoes);
        this._limpaFormulario();
        console.log(this._listaNegociacoes.negociacoes);
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