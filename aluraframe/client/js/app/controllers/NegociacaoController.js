class NegociacaoController{

	//OBS para fazer o botão importar negociações funcionar, tem que rodar o server
	//entre na pasta serve e de um npm start
	//agora bastra abrir o http://localhost:3000
	constructor(){
		this._ordemAtual = '';
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
        //this._listaNegociacoes = new ListaNegociacoes((model) =>
        // 	this._negociacoesView.update(model));

        this._listaNegociacoes = new Bind(new ListaNegociacoes(),
        	new NegociacoesView($("#negociacoesView")),'adiciona','esvazia','ordena','inverteOrdem');

        this._mensagem = new Bind(new Mensagem(),
        	new MensagemView($("#mensagemView")),'texto');

        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .then(negociacoes => 
                    negociacoes.forEach(negociacao => 
                        this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro => {
                console.log(erro);
                this._mensagem.texto = error;
            });

	}

	adiciona(event){

		//isso cancela a atualização da pagina na hora de submeter
		event.preventDefault();

        ConnectionFactory
            .getConnection()
            .then(connection =>{

                let negociacao = this._criaNegociacao();
                new NegociacaoDao(connection)
                    .adiciona(negociacao)
                    .then(() =>{
                        
                        this._listaNegociacoes.adiciona(negociacao);
                        this._mensagem.texto = "Negociação adicionada com sucesso";

                        this._limpaFormulario();
                    })
            })
            .catch(erro => {

                this._mensagem.texto = erro;
            });
	}

	importaNegociacoes() {

        let service = new NegociacaoService();
        service
        .obterNegociacoes()
        .then(negociacoes => {
        	negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
        	this._mensagem.texto = 'Negociações do período importadas com sucesso';
        })
        .catch(error => this._mensagem.texto = error);  
    }

    ordena(coluna) {
        if(this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);    
        }
        this._ordemAtual = coluna;
    }

	apaga(){

        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(mensagem => {
        	   this._mensagem.texto = mensagem;
               this._listaNegociacoes.esvazia();
            });

	}

	_criaNegociacao(){
		return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value));
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