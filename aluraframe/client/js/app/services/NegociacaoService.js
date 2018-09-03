'use strict';

System.register(['./HttpService', './ConnectionFactory', '../dao/NegociacaoDao', '../models/Negociacao'], function (_export, _context) {
  "use strict";

  var HttpService, ConnectionFactory, NegociacaoDao, Negociacao, _createClass, NegociacaoService;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_HttpService) {
      HttpService = _HttpService.HttpService;
    }, function (_ConnectionFactory) {
      ConnectionFactory = _ConnectionFactory.ConnectionFactory;
    }, function (_daoNegociacaoDao) {
      NegociacaoDao = _daoNegociacaoDao.NegociacaoDao;
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

      _export('NegociacaoService', NegociacaoService = function () {
        function NegociacaoService() {
          _classCallCheck(this, NegociacaoService);

          this._http = new HttpService();
        }

        _createClass(NegociacaoService, [{
          key: 'obterNegociacoesDaSemana',
          value: function obterNegociacoesDaSemana() {

            return this._http.get("negociacoes/semana").then(function (negociacoes) {
              return negociacoes.map(function (objeto) {
                return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
              });
            }).catch(function (erro) {
              console.log(erro);
              throw new Error("Não foi possivel obter as negociações da semana");
            });

            //o xhr.responseText é um texto
            //JSON.parse vai retornar o texto do response.text em objeto
            //.map para cada objeto dentro dessa lista eu converto ele para uma instancia de Negociacao
            //isso no final vai gerar um novo array
            // nesse novo array eu percorro cada item e adiciona em listaNegociacoes
            //sobre o .map() http://desenvolvimentoparaweb.com/javascript/map-filter-reduce-javascript/
          }
        }, {
          key: 'obterNegociacoesDaSemanaAnterior',
          value: function obterNegociacoesDaSemanaAnterior() {

            return this._http.get("negociacoes/anterior").then(function (negociacoes) {
              return negociacoes.map(function (objeto) {
                return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
              });
            }).catch(function (erro) {
              console.log(erro);
              throw new Error("Não foi possivel obter as negociações da semana anterior");
            });
          }
        }, {
          key: 'obterNegociacoesDaSemanaRetrasada',
          value: function obterNegociacoesDaSemanaRetrasada() {

            return this._http.get("negociacoes/retrasada").then(function (negociacoes) {
              return negociacoes.map(function (objeto) {
                return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
              });
            }).catch(function (erro) {
              console.log(erro);
              throw new Error("Não foi possivel obter as negociações da semana retrasada");
            });
          }
        }, {
          key: 'obterNegociacoes',
          value: function obterNegociacoes() {

            return Promise.all([this.obterNegociacoesDaSemana(), this.obterNegociacoesDaSemanaAnterior(), this.obterNegociacoesDaSemanaRetrasada()]).then(function (periodos) {

              var negociacoes = periodos.reduce(function (dados, periodo) {
                return dados.concat(periodo);
              }, []);

              return negociacoes;
            }).catch(function (erro) {
              throw new Error(erro);
            });
          }
        }, {
          key: 'cadastra',
          value: function cadastra(negociacao) {

            return ConnectionFactory.getConnection().then(function (connection) {
              return new NegociacaoDao(connection);
            }).then(function (dao) {
              return dao.adiciona(negociacao);
            }).then(function () {
              return 'Negociação adicionada com sucesso';
            }).catch(function (erro) {
              console.log(erro);
              throw new Error('Não foi possível adicionar a negociação');
            });
          }
        }, {
          key: 'lista',
          value: function lista() {

            return ConnectionFactory.getConnection().then(function (connection) {
              return new NegociacaoDao(connection);
            }).then(function (dao) {
              return dao.listaTodos();
            }).catch(function (erro) {
              console.log(erro);
              throw new Error('Não foi possível obter as negociações');
            });
          }
        }, {
          key: 'apaga',
          value: function apaga() {

            return ConnectionFactory.getConnection().then(function (connection) {
              return new NegociacaoDao(connection);
            }).then(function (dao) {
              return dao.apagaTodos();
            }).then(function () {
              return 'Negociações apagadas com sucesso';
            }).catch(function (erro) {
              console.log(erro);
              throw new Error('Não foi possível apagar as negociações');
            });
          }
        }, {
          key: 'importa',
          value: function importa(listaAtual) {

            return this.obterNegociacoes().then(function (negociacoes) {
              return negociacoes.filter(function (negociacao) {
                return !listaAtual.some(function (negociacaoExistente) {
                  return negociacao.isEquals(negociacaoExistente);
                });
              });
            }).catch(function (erro) {

              console.log(erro);
              throw new Error('Não foi possivel importar as negociações');
            });

            //filter ele ira filtar pela listaNegociacoes e em nogaciacoes ele ira usar o some() pra ve se existe ja negociacao
            //porque se a gente não usasse isso ele ira comprar 2 objetos que podem ter o mesmo valor mas tem instancias diferentes
            //A função some() vai varrer cada item da lista verificando se os elementos são iguais ao critério estabelecido


            /*
            Estamos fazendo o filtro que varrerá todos os elementos. 
            O primeiro array que será testado (this._listaNegociacoes) 
            verificará se cada item já existente é igual a negociação filtrada. 
            Caso seja equivalente, o some() retornará "verdadeiro"
            e o item entrará no filtro de negociações. 
            Como nosso objetivo é que o some() retorne "verdadeiro", 
            caso ele siga até o final do array sem encontrar um elemento igual ao filtro, 
            usaremos o sinal de exclamação (!). Com isto, no próximo encadeamento da função then(), 
            teremos as negociações que não existem dentro de _listaNegociacoes.negociacoes.
            */
          }
        }]);

        return NegociacaoService;
      }());

      _export('NegociacaoService', NegociacaoService);
    }
  };
});
//# sourceMappingURL=NegociacaoService.js.map