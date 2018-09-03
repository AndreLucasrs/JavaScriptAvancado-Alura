import {HttpService} from './HttpService';
import {ConnectionFactory} from './ConnectionFactory';
import {NegociacaoDao} from '../dao/NegociacaoDao';
import {Negociacao} from '../models/Negociacao';

export class NegociacaoService {

	constructor(){

		this._http = new HttpService();
	}

	obterNegociacoesDaSemana(){

		return this._http
			.get("negociacoes/semana")
			.then(negociacoes => negociacoes.map(objeto => new Negociacao(new Date(objeto.data),objeto.quantidade,objeto.valor)))
			.catch(erro => {
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

	obterNegociacoesDaSemanaAnterior(){

		return this._http
			.get("negociacoes/anterior")
			.then(negociacoes => negociacoes.map(objeto => new Negociacao(new Date(objeto.data),objeto.quantidade,objeto.valor)))
			.catch(erro => {
				console.log(erro);
				throw new Error("Não foi possivel obter as negociações da semana anterior");
			});
	}

	obterNegociacoesDaSemanaRetrasada(){

		return this._http
			.get("negociacoes/retrasada")
			.then(negociacoes => negociacoes.map(objeto => new Negociacao(new Date(objeto.data),objeto.quantidade,objeto.valor)))
			.catch(erro => {
				console.log(erro);
				throw new Error("Não foi possivel obter as negociações da semana retrasada");
			});
	}

	obterNegociacoes() {

        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ]).then(periodos => {

            let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), []);

            return negociacoes;

        }).catch(erro => {
            throw new Error(erro);
        });
    } 
    //sobre o .reduce() http://desenvolvimentoparaweb.com/javascript/map-filter-reduce-javascript/

    cadastra(negociacao){

    	return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.adiciona(negociacao))
            .then(() => 'Negociação adicionada com sucesso')
            .catch(erro => {
            	console.log(erro);
            	throw new Error('Não foi possível adicionar a negociação');
            });
    }

    lista(){

    	return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .catch(erro =>{
            	console.log(erro);
            	throw new Error('Não foi possível obter as negociações');
            });

    }

    apaga(){

    	return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(() => 'Negociações apagadas com sucesso')
            .catch(erro => {
            	console.log(erro);
            	throw new Error('Não foi possível apagar as negociações');
            });
    }

    importa(listaAtual){

    	return this.obterNegociacoes()
	        .then(negociacoes => 
	            negociacoes.filter(negociacao => 
	                !listaAtual.some(negociacaoExistente => 
	                    negociacao.isEquals(negociacaoExistente)))
	        	)
	        	.catch(erro => {

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
}