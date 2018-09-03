'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NegociacoesView = function (_View) {
  _inherits(NegociacoesView, _View);

  function NegociacoesView(elemento) {
    _classCallCheck(this, NegociacoesView);

    return _possibleConstructorReturn(this, (NegociacoesView.__proto__ || Object.getPrototypeOf(NegociacoesView)).call(this, elemento));
  }

  _createClass(NegociacoesView, [{
    key: 'template',
    value: function template(model) {
      //usando template String
      //template String js, usas-se isso ` `
      //quando uso o join eu coloco como criterio junção uma String em branco,
      //ele ira varrer a lista e criar uma nova lista, mas essa nova lista so vai ter String
      //e no final eu dou um join, ae vai virar uma String com todos os itens do array concatenados
      return '\n\t\t\t\t\t<table class="table table-hover table-bordered">\n        \t\t\t\t<thead>\n            \t\t\t\t<tr>\n                \t\t\t\t<th onclick="negociacaoController.ordena(\'data\')">DATA</th>\n                                <th onclick="negociacaoController.ordena(\'quantidade\')">QUANTIDADE</th>\n                                <th onclick="negociacaoController.ordena(\'valor\')">VALOR</th>\n                                <th onclick="negociacaoController.ordena(\'volume\')">VOLUME</th>\n            \t\t\t\t</tr>\n        \t\t\t\t</thead>\n\n        \t\t\t\t<tbody>\n        \t\t\t\t\t' + model.negociacoes.map(function (n) {
        return '\n        \t\t\t\t\t\t\t<tr>\n        \t\t\t\t\t\t\t\t<td>' + DateHelper.dataParaTexto(n.data) + '</td>\n        \t\t\t\t\t\t\t\t<td>' + n.quantidade + '</td>\n        \t\t\t\t\t\t\t\t<td>' + n.valor + '</td>\n        \t\t\t\t\t\t\t\t<td>' + n.volume + '</td>\n        \t\t\t\t\t\t\t</tr> \n        \t\t\t\t\t\t';
      }).join('') + '\n        \t\t\t\t</tbody>\n        \n        \t\t\t\t<tfoot>\n        \t\t\t\t\t<td colspan="3"></td>\n    \t\t\t\t\t\t<td>\n                                ' + model.volumeTotal + '\n                            </td>\n        \t\t\t\t</tfoot>\n    \t\t\t\t</table>\n\t\t\t\t';
    }
    //quanto temos uma arrow function, quando temos uma unica instrução não precisa-se do return e nem das {}
    //esse caso esta acontecendo no .map()
    //nesse ultimo caso de expressão estamos usando o .reduce(), serve para reduzir,
    //ela processa o array e no final retorna um unico resultado
    //aquele 0.0 no final esta falando que total inicia com 0.0

    //OBS IIEF
    //Immediately-invoked function expression (IIFE) ou a função imediata
    //Vc cria a função e ja chama
    /*(function() {
    
               let total = 0;
               model.negociacoes.forEach(n => total+= n.volume);
               return total;
          })()*/

  }]);

  return NegociacoesView;
}(View);
//# sourceMappingURL=NegociacoesView.js.map