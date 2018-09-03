'use strict';

System.register([], function (_export, _context) {
	"use strict";

	var _createClass, HttpService;

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

			_export('HttpService', HttpService = function () {
				function HttpService() {
					_classCallCheck(this, HttpService);
				}

				_createClass(HttpService, [{
					key: '_handleErros',
					value: function _handleErros(res) {

						if (!res.ok) throw new Error(res.statusText);

						return res;
					}
				}, {
					key: 'get',
					value: function get(url) {
						var _this = this;

						//Fetch API, uma API de busca do JS
						//No escopo global, nós iremos adicionar a variável fetch, no HttpService.js. 
						//O resultado dela está no then(), 
						//isto significa que o retorno será uma Promise por padrão.
						//vai chamar a url, então verifica se a resposta é ok se for ok então retorna json ou poderia ser texto se quisesse
						return fetch(url).then(function (res) {
							return _this._handleErros(res);
						}).then(function (res) {
							return res.json();
						});
					}
				}, {
					key: 'post',
					value: function post(url, dado) {
						var _this2 = this;

						return fetch(url, {
							headers: { 'Content-Type': 'application/json' },
							method: 'post',
							body: JSON.stringify(dado)
						}).then(function (res) {
							return _this2._handleErros(res);
						});
					}
				}]);

				return HttpService;
			}());

			_export('HttpService', HttpService);
		}
	};
});
//# sourceMappingURL=HttpService.js.map