class HttpService {
	
	get(url){

		//Padrão de Projeto Promise
		return new Promise((resolve,reject) => {

			let xhr = new XMLHttpRequest();
			
			//isso quer dizer que ele esta preparando pra fazer a requisição, ele não esta fazendo ainda
			xhr.open("GET",url);

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
						resolve(JSON.parse(xhr.responseText));
					} 
					else {

						reject(xhr.responseText);
					}
				}
			};

			//agora ele ira fazer requisição
			xhr.send();
		});
	}

	post(url, dado) {

            return new Promise((resolve, reject) => {

                let xhr = new XMLHttpRequest();
                xhr.open("POST", url, true);
                xhr.setRequestHeader("Content-type", "application/json");
                xhr.onreadystatechange = () => {

                    if (xhr.readyState == 4) {

                        if (xhr.status == 200) {

                            resolve(JSON.parse(xhr.responseText));
                        } else {

                            reject(xhr.responseText);
                        }
                    }
                };
                xhr.send(JSON.stringify(dado)); // usando JSON.stringifly para converter objeto em uma string no formato JSON.
        });
    }	
}


//Promise
/*
Parecerá ser um método síncrono.
No entanto, ele não é... 
Porque ele não devolverá a lista de negociações,
mas, sim, uma promise - que não poderá encontrar o que busca. 
A promessa é o resultado futuro de uma operação. 
Quando pensamos no conceito de uma promessa, nos vem a ideia de que 
"se você cumprir a promessa, então algo irá acontecer...". 
Seguindo está relação com então, chamaremos o método then() na promise.
*/