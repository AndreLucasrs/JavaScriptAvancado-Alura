"use strict";

System.register([], function (_export, _context) {
	"use strict";

	var _createClass, DateHelper;

	function _toConsumableArray(arr) {
		if (Array.isArray(arr)) {
			for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
				arr2[i] = arr[i];
			}

			return arr2;
		} else {
			return Array.from(arr);
		}
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [],
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

			_export("DateHelper", DateHelper = function () {
				function DateHelper() {
					_classCallCheck(this, DateHelper);

					throw new Error("Esta classe não pode ser instanciada");
				}

				_createClass(DateHelper, null, [{
					key: "dataParaTexto",
					value: function dataParaTexto(data) {
						//template String
						return data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear();
					}
				}, {
					key: "textoParaData",
					value: function textoParaData(texto) {
						//expressão regular para testar se a data esta vindo no formato esperado,
						//fail fast
						if (!/\d{2}\/\d{2}\/\d{4}/.test(texto)) {
							throw new Error("Deve estar no formato dd-mm-aaaa");
						}
						//Quando geramos o array com ano, mês e dia, ele transforma cada item em uma string e adiciona o separado. Só que quando passamos o array '2016', '11', '12', o que é o reagrupamento por debaixo dos panos de cada item usando o separador ,.
						//Existe no array o método join(), que une todos os itens e depois, forma uma string com separadores.
						//let data = new Date(this._inputData.value.split('-'));
						//... (reticências) posicionado antes do this, com este spread operator, indicamos que o array será desmembrado - e o primeiro item do array, e cada parâmetro do Date será posicionado na mesma ordem no construtor
						//return new Date(...texto.split('-').map((item,indice) => item - indice % 2 ));
						return new (Function.prototype.bind.apply(Date, [null].concat(_toConsumableArray(texto.split('/').reverse().map(function (item, indice) {
							return item - indice % 2;
						})))))();
						//.map(function(item, indice) {
						//    return item - indice % 2;
						//}));
					}
				}]);

				return DateHelper;
			}());

			_export("DateHelper", DateHelper);
		}
	};
});
//# sourceMappingURL=DateHelper.js.map