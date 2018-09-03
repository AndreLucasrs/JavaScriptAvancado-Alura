'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mensagem = function () {

    //texto='', isso quer dizer que o valor padrão do parametro é '',
    //vc pode colcar esse valor padrão é metodos, construtores e função
    //isso serve para no caso de algo como um Mensagem mensage = new Mensagem()
    //vc não fica obrigado a passar o parametro, pq ele ja tem um padrão
    function Mensagem() {
        var texto = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        _classCallCheck(this, Mensagem);

        this._texto = texto;
    }

    _createClass(Mensagem, [{
        key: 'texto',
        get: function get() {

            return this._texto;
        },
        set: function set(texto) {

            this._texto = texto;
        }
    }]);

    return Mensagem;
}();
//# sourceMappingURL=Mensagem.js.map