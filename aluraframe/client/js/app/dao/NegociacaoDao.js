'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoDao = function () {
    function NegociacaoDao(connection) {
        _classCallCheck(this, NegociacaoDao);

        this._connection = connection;
        this._store = 'negociacoes';
    }

    _createClass(NegociacaoDao, [{
        key: 'adiciona',
        value: function adiciona(negociacao) {
            var _this = this;

            return new Promise(function (resolve, reject) {

                var request = _this._connection.transaction([_this._store], "readwrite").objectStore(_this._store).add(negociacao);

                /*
                //toda vez que for gravar no Object store primeiro preciso pedir uma transação e dizer qual é o Object store da transação e o tipo
                let transaction = this._connection.transaction([this._store],'readwrite');
                //dessa transação acima eu tenho acesso ao objectStore
                let store = transaction.objectStore(this._store);
                //desse object store eu tenho um metodo add que permite adicionar um objeto dentro dele
                //mas o add me retorna uma requisição para poder adicionar
                let request = store.add(negociacao);
                */

                request.onsuccess = function (e) {

                    resolve();
                };

                request.onerror = function (e) {

                    console.log(e.target.error);
                    reject('Não foi possível adicionar a negociação');
                };
            });
        }
    }, {
        key: 'listaTodos',
        value: function listaTodos() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {

                var cursor = _this2._connection.transaction([_this2._store], "readwrite").objectStore(_this2._store).openCursor();

                var negociacoes = [];

                //onsuccess é chamado toda vez que cria um cursor
                //toda vez que ele for criado ele ira me retornar um ponteiro
                cursor.onsuccess = function (e) {

                    //e.target.result é o que retorna o ponteiro, ele vai apontar para o primeiro objeto da minha object store se tiver
                    var atual = e.target.result;

                    //vc verifica se a dado
                    if (atual) {

                        //se a um ponteiro valido com esse atual.value ele pego o valor que a dentro dele
                        var dado = atual.value;

                        //como o dado que é salvo no object store é so um json com os atributos
                        //aqui para enserir em negociacao eu vou criar uma instancia de Negociacao e passar o valor para esta instancia
                        negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));

                        //aqui eu chamo ele passar para o proximo, isso quer dizer ele vai chamar o onsucess novamente, enquanto tiver dado ele ira cair nesse if, quando não houver mais ele ira cair no else
                        atual.continue();
                    } else {
                        resolve(negociacoes);
                    }
                };

                cursor.onerror = function (e) {
                    console.log(e.target.error.name);
                    reject('Não foi possivel lista as negociações');
                };

                /*
                let transaction = connection.transaction(['negociacoes'],'readwrite');
                let store = transaction.objectStore('negociacoes');
                }else{
                console.log(negociacoes);
                }
                };
                */
            });
        }
    }, {
        key: 'apagaTodos',
        value: function apagaTodos() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {

                var request = _this3._connection.transaction([_this3._store], "readwrite").objectStore(_this3._store).clear();

                request.onsuccess = function (e) {
                    return resolve('Negociações apagadas com sucesso');
                };

                request.onerror = function (e) {

                    console.log(e.target.error);
                    reject('Não foi possivel apagar  as negociações');
                };
            });
        }
    }]);

    return NegociacaoDao;
}();
//# sourceMappingURL=NegociacaoDao.js.map