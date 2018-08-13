class NegociacaoService {

	//cb = callback
	obterNegociacoesDaSemana(cb){

		let xhr = new XMLHttpRequest();

		//isso quer dizer que ele esta preparando pra fazer a requisição, ele não esta fazendo ainda
		xhr.open("GET","negociacoes/semana");

		/*configuração*/
		//essa função vai ser chamada toda vez que o estado do xhr mudar
		/* Esses são os estados
			0: requisição ainda não iniciada
			1: conexão com o servidor estabelecida
			2: requisição recebida
			3: processando requisição
			4: requisição está concluída e a resposta está pronta
		*/
		xhr.onreadystatechange = () => {

			if(xhr.readyState == 4){

				if(xhr.status == 200){

					//xhr.responseText traz a resposta do servido os dados
					//JSON.parse recebe um texto que equivale a um JSON e converte esse texto em Objeto JavaScript
					cb(null,JSON.parse(xhr.responseText).map(objeto => new Negociacao(new Date(objeto.data),objeto.quantidade,objeto.valor)));
					//.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));

					//o xhr.responseText é um texto
					//JSON.parse vai retornar o texto do response.text em objeto
					//.map para cada objeto dentro dessa lista eu converto ele para uma instancia de Negociacao
					//isso no final vai gerar um novo array
					// nesse novo array eu percorro cada item e adiciona em listaNegociacoes
					//sobre o .map() http://desenvolvimentoparaweb.com/javascript/map-filter-reduce-javascript/
				} 
				else {

					console.log(xhr.responseText);
					cb("Não foi possivel obter as Negociações",null);
				}
			}
		};

		//agora ele ira fazer requisição
		xhr.send();
	}
}