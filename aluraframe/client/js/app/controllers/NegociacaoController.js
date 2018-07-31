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
        //this._listaNegociacoes = new ListaNegociacoes((model) =>
        // 	this._negociacoesView.update(model));

         //O proxy é um objeto que ira ser a copia de negociacao, ele irar encapsular o objeto real
        //e com ele a gente pode alterar codigo de infra sem problema
        //proxy se baseia em um padrão de projeto
        let self = this;
        this._listaNegociacoes = new Proxy(new ListaNegociacoes(),{

//O target é o objeto real, que é encapsulado pelo proxy.
//O prop é a propriedade que está sendo lida.
//O receiver é uma referência ao próprio proxy.
            get(target,prop,receiver){
                
                //ele verifica se dentro do vetor tem um prop, o includes, esta sendo isso
                //quando chamado o get ele ira olhar se é um metodo ou uma funcao
                //se for uma funcao ele
                //ele cria uma nova função temporada no proxy
                // e o arguments esta pegando todos os paramentros da chamada que esta fazendo para //cair nesse if
                //nesse caso a linha abaixo lista.adiciona()
                //então o arguments passa esse os parametros para nova função criada 
                //se for um metodo ele retorna o get normal
                if(['adiciona','esvazia'].includes(prop) && typeof(target[prop]) == typeof(Function)){

                    return function(){

                        console.log(`interceptando ${prop}`);
                        Reflect.apply(target[prop],target,arguments);
                        self._negociacoesView.update(target);
                    }
                }

                return Reflect.get(target,prop,receiver);
            }

        });

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