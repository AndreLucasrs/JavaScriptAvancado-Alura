"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ListaNegociacoes = function () {

    //constructor(contexto, armadilha) {
    function ListaNegociacoes() {
        _classCallCheck(this, ListaNegociacoes);

        this._negociacoes = [];
        //isso ira fazer a tela se atualizar sempre, pq o parametro passado é uma função anonima de update
        //essa armadilha sempre sera chamado no adiciona ou no esvazia
        //this._armadilha = armadilha;
        //this._contexto = contexto;
    }

    _createClass(ListaNegociacoes, [{
        key: "adiciona",
        value: function adiciona(negociacao) {

            this._negociacoes.push(negociacao);
            //o model é a instancia de listaNegociacoes esta passando quando esta sendo chamada
            //esse this dentro da armadilha esta recebendo a propria estancia de quem esta chamando-a
            //this._armadilha(this);
            //Reflect.apply(this._armadilha,this._contexto,[this]);
        }
    }, {
        key: "esvazia",
        value: function esvazia() {

            this._negociacoes = [];
            //this._armadilha(this);
            //Reflect.apply(this._armadilha,this._contexto,[this])
        }
    }, {
        key: "ordena",
        value: function ordena(criterio) {
            this._negociacoes.sort(criterio);
        }
    }, {
        key: "inverteOrdem",
        value: function inverteOrdem() {
            this._negociacoes.reverse();
        }
    }, {
        key: "negociacoes",
        get: function get() {
            //dessa forma abaixo, que desse um get negociacao.push, conseguia adicionar um novo valor, e não apenas pegalo
            //return this._negociacoes;
            //isso estar retornando a copia do array, se vc der um push agora, vc estara inserindo valores
            //na copia da lista, e não na lista original
            return [].concat(this._negociacoes);
        }
    }, {
        key: "volumeTotal",
        get: function get() {
            return this._negociacoes.reduce(function (total, n) {
                return total + n.volume;
            }, 0.0);
        }
    }]);

    return ListaNegociacoes;
}();
//# sourceMappingURL=ListaNegociacoes.js.map