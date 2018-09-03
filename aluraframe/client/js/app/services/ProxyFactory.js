"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _typeof, _createClass, ProxyFactory;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };

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

            _export("ProxyFactory", ProxyFactory = function () {
                function ProxyFactory() {
                    _classCallCheck(this, ProxyFactory);
                }

                _createClass(ProxyFactory, null, [{
                    key: "create",
                    value: function create(objeto, props, acao) {

                        //O proxy é um objeto que ira ser a copia de negociacao, ele irar encapsular o objeto real
                        //e com ele a gente pode alterar codigo de infra sem problema
                        //proxy se baseia em um padrão de projeto
                        return new Proxy(objeto, {
                            get: function get(target, prop, receiver) {

                                //ele verifica se dentro do vetor tem um prop, o includes, esta sendo isso
                                //quando chamado o get ele ira olhar se é um metodo ou uma funcao
                                //se for uma funcao ele
                                //ele cria uma nova função temporada no proxy
                                // e o arguments esta pegando todos os paramentros da chamada que esta fazendo para //cair nesse if
                                //nesse caso a linha abaixo lista.adiciona()
                                //então o arguments passa esse os parametros para nova função criada 
                                //se for um metodo ele retorna o get normal
                                if (props.includes(prop) && ProxyFactory._ehFuncao(target[prop])) {

                                    return function () {

                                        console.log("interceptando " + prop);
                                        Reflect.apply(target[prop], target, arguments);
                                        return acao(target);
                                    };
                                }

                                return Reflect.get(target, prop, receiver);
                            },
                            set: function set(target, prop, value, receiver) {

                                if (props.includes(prop)) {
                                    target[prop] = value;
                                    acao(target);
                                }
                                return Reflect.set(target, prop, value, receiver);
                            }
                        });
                    }
                }, {
                    key: "_ehFuncao",
                    value: function _ehFuncao(func) {

                        return (typeof func === "undefined" ? "undefined" : _typeof(func)) == (typeof Function === "undefined" ? "undefined" : _typeof(Function));
                    }
                }]);

                return ProxyFactory;
            }());

            _export("ProxyFactory", ProxyFactory);
        }
    };
});
//# sourceMappingURL=ProxyFactory.js.map