'use strict';

System.register(['../models/ListaNegociacoes', '../models/Mensagem', '../view/NegociacoesView', '../view/MensagemView', '../services/NegociacaoService', '../helpers/DateHelper', '../helpers/Bind', '../models/Negociacao'], function (_export, _context) {
    "use strict";

    var ListaNegociacoes, Mensagem, NegociacoesView, MensagemView, NegociacaoService, DateHelper, Bind, Negociacao, _createClass, NegociacaoController, negociacaoController;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_modelsListaNegociacoes) {
            ListaNegociacoes = _modelsListaNegociacoes.ListaNegociacoes;
        }, function (_modelsMensagem) {
            Mensagem = _modelsMensagem.Mensagem;
        }, function (_viewNegociacoesView) {
            NegociacoesView = _viewNegociacoesView.NegociacoesView;
        }, function (_viewMensagemView) {
            MensagemView = _viewMensagemView.MensagemView;
        }, function (_servicesNegociacaoService) {
            NegociacaoService = _servicesNegociacaoService.NegociacaoService;
        }, function (_helpersDateHelper) {
            DateHelper = _helpersDateHelper.DateHelper;
        }, function (_helpersBind) {
            Bind = _helpersBind.Bind;
        }, function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            NegociacaoController = function () {

                //OBS para fazer o botão importar negociações funcionar, tem que rodar o server
                //entre na pasta serve e de um npm start
                //agora bastra abrir o http://localhost:3000
                function NegociacaoController() {
                    _classCallCheck(this, NegociacaoController);

                    this._ordemAtual = '';
                    //Se declaramos as variáveis usando o let, estas ganharam um escopo de bloco	
                    //estamos informando que o querySelector irá para a variável $, mas ainda manterá uma associação com document
                    var $ = document.querySelector.bind(document);
                    this._inputData = $('#data');
                    this._inputQuantidade = $('#quantidade');
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

                    this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($("#negociacoesView")), 'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

                    this._mensagem = new Bind(new Mensagem(), new MensagemView($("#mensagemView")), 'texto');

                    this._service = new NegociacaoService();

                    this._init();
                }

                _createClass(NegociacaoController, [{
                    key: '_init',
                    value: function _init() {
                        var _this = this;

                        this._service.lista().then(function (negociacoes) {
                            return negociacoes.forEach(function (negociacao) {
                                return _this._listaNegociacoes.adiciona(negociacao);
                            });
                        }).catch(function (erro) {
                            return _this._mensagem.texto = erro;
                        });

                        setInterval(function () {
                            _this.importaNegociacoes();
                        }, 3000);
                    }
                }, {
                    key: 'adiciona',
                    value: function adiciona(event) {
                        var _this2 = this;

                        //isso cancela a atualização da pagina na hora de submeter
                        event.preventDefault();

                        var negociacao = this._criaNegociacao();

                        this._service.cadastra(negociacao).then(function (mensagem) {

                            _this2._listaNegociacoes.adiciona(negociacao);
                            _this2._mensagem.texto = mensagem;
                            _this2._limpaFormulario();
                        }).catch(function (erro) {
                            return _this2._mensagem.texto = erro;
                        });
                    }
                }, {
                    key: 'importaNegociacoes',
                    value: function importaNegociacoes() {
                        var _this3 = this;

                        this._service.importa(this._listaNegociacoes.negociacoes).then(function (negociacoes) {
                            return negociacoes.forEach(function (negociacao) {

                                _this3._listaNegociacoes.adiciona(negociacao);
                                _this3._mensagem.texto = 'Negociações do período importadas';
                            });
                        }).catch(function (erro) {
                            return _this3._mensagem.texto = erro;
                        });
                    }
                }, {
                    key: 'ordena',
                    value: function ordena(coluna) {
                        if (this._ordemAtual == coluna) {
                            this._listaNegociacoes.inverteOrdem();
                        } else {
                            this._listaNegociacoes.ordena(function (a, b) {
                                return a[coluna] - b[coluna];
                            });
                        }
                        this._ordemAtual = coluna;
                    }
                }, {
                    key: 'apaga',
                    value: function apaga() {
                        var _this4 = this;

                        this._service.apaga().then(function (mensagem) {
                            _this4._mensagem.texto = mensagem;
                            _this4._listaNegociacoes.esvazia();
                        }).catch(function (erro) {
                            return _this4._mensagem.texto = erro;
                        });
                    }
                }, {
                    key: '_criaNegociacao',
                    value: function _criaNegociacao() {
                        return new Negociacao(DateHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
                    }
                }, {
                    key: '_limpaFormulario',
                    value: function _limpaFormulario() {

                        this._inputData.value = '';
                        this._inputQuantidade.value = 1;
                        this._inputValor.value = 0.0;

                        this._inputData.focus();
                    }
                }]);

                return NegociacaoController;
            }();

            negociacaoController = new NegociacaoController();
            function currentInstance() {

                return negociacaoController;
            }

            /*
            Nós programaremos com o ES6 e depois, vamos compilar o código para o ES5. 
            Este processo de downgrade recebe o nome de transcompilação e é feito com o uso de um transpiler 
            (transcompilador). Com isto, o código da Controller consegue ter o mesmo resultado no ES 5. 
            Desta forma, conseguimos aumentar a quantidade de navegadores que suportarão o nosso código, e assim,
            com a sua compatibilidade.
            
            Encontramos vários transpilers no mercado: 
            Babel, o TypeScript (que também atua como transcompilador). 
            No nosso caso, focaremos no Babel, por ser open source.
            
            O código-fonte estará escrito com o ES 6, 
            mas o resultado da transcompilação ficará na pasta app. 
            E será desta que iremos importar os arquivos do index.html. 
            Porém, se tentarmos recarregar a página do formulário agora, 
            ela não funcionará porque nenhum scriptserá encontrado. 
            Veremos como fazer a transcompilação.
            
            */

            /*
            
            OBS
            
            ATENÇÃO: o projeto não possui a pasta aluraframe/client/node_modules e você precisará baixar as dependências abrindo o terminal na pasta aluraframe/client para em seguida executar o comando npm install. Este comando lerá seu arquivo package.json e baixará todas dependências listadas nele. Vá tomar um café enquanto as dependências são baixadas.
            
            ATENÇÃO 2: se você fez testes e foi incrementando a versão do seu banco, será necessário usar um número igual ou superior à versão do banco criado em seu navegador. Para isso, altere aluraframe/client/js/app/services/ConnectionFactory.js para que a variável version utilize a versão correta.
            
            */

            _export('currentInstance', currentInstance);
        }
    };
});
//# sourceMappingURL=NegociacaoController.js.map