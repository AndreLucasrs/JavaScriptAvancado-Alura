'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//função auto invocada, ela vai carregar e ao mesmo tempo executada
//IIFE
var ConnectionFactory = function () {

	var stores = ['negociacoes'];
	var version = 7;
	var dbName = 'aluraframe';

	var connection = null;

	var close = null;

	return function () {
		function ConnectionFactory() {
			_classCallCheck(this, ConnectionFactory);

			throw new Error("Não é possível criar instâncias de ConnectionFactory");
		}

		_createClass(ConnectionFactory, null, [{
			key: 'getConnection',
			value: function getConnection() {

				return new Promise(function (resolve, reject) {

					var openRequest = window.indexedDB.open(dbName, version);

					openRequest.onupgradeneeded = function (e) {

						ConnectionFactory._createStores(e.target.result);
					};

					openRequest.onsuccess = function (e) {

						if (!connection) {
							connection = e.target.result;
							close = connection.close.bind(connection);
							//O desenvolvedor não poderá obter uma conexão e a partir desta, fechar, porque assim pode ocorrer um problema geral na aplicação. Para isto, vamos utilizar o Monkey Patch, que consiste forçarmos a modificação de uma API. No caso, nós iremos alterar o método close()
							connection.close = function () {
								throw new Error('Você não pode fechar diretamente a conexão');
							};
						}
						resolve(connection);
					};

					openRequest.onerror = function (e) {

						console.log(e.target.error);

						reject(e.target.error.name);
					};
				});
			}
		}, {
			key: '_createStores',
			value: function _createStores(connection) {

				stores.forEach(function (store) {
					if (connection.objectStoreNames.contains(store)) {
						connection.deleteObjectStore(store);
					}
					connection.createObjectStore(store, { autoIncrement: true });
				});
			}
		}, {
			key: 'closeConnection',
			value: function closeConnection() {

				if (connection) {
					close();
					connection = null;
				}
			}
		}]);

		return ConnectionFactory;
	}();
}();

/*

Porque o codigo acima ficou dessa forma ?
para resolver um problema porque tinha varias variaves com escopo global fora da classe
e qualquer um poderia acessar, então para resolver isso aplicamos
um padrão de projeto JavaScript chamado Module Pattern
Um módulo é uma unidade código confinada e que ninguém tem acesso ao conteúdo dentro dele. 
Uma maneira de criarmos um escopo privado no JavaScript
 é colocando o código em uma função

*/
//# sourceMappingURL=ConnectionFactory.js.map