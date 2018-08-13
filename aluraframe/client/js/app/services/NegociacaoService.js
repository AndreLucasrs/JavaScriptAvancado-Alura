class NegociacaoService {

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
}