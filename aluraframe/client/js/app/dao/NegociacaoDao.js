class NegociacaoDao {

    constructor(connection) {

        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao) {

        return new Promise((resolve, reject) => {

            let request = this
                ._connection
                .transaction([this._store],"readwrite")
                .objectStore(this._store)
                .add(negociacao);


            /*
			//toda vez que for gravar no Object store primeiro preciso pedir uma transação e dizer qual é o Object store da transação e o tipo
			let transaction = this._connection.transaction([this._store],'readwrite');

			//dessa transação acima eu tenho acesso ao objectStore
			let store = transaction.objectStore(this._store);

			//desse object store eu tenho um metodo add que permite adicionar um objeto dentro dele
			//mas o add me retorna uma requisição para poder adicionar
			let request = store.add(negociacao);
			*/    
                

            request.onsuccess = (e) => {

                resolve();
            };

            request.onerror = e => {

                console.log(e.target.error);
                reject('Não foi possível adicionar a negociação');
            };                
        });
    }

    listaTodos(){

    	return new Promise((resolve,reject) =>{


    		let cursor = this
                ._connection
                .transaction([this._store],"readwrite")
                .objectStore(this._store)
                .openCursor();

			let negociacoes = [];

			//onsuccess é chamado toda vez que cria um cursor
			//toda vez que ele for criado ele ira me retornar um ponteiro
			cursor.onsuccess = e => {

				//e.target.result é o que retorna o ponteiro, ele vai apontar para o primeiro objeto da minha object store se tiver
				let atual = e.target.result;

				//vc verifica se a dado
				if(atual){

					//se a um ponteiro valido com esse atual.value ele pego o valor que a dentro dele
					let dado = atual.value;

					//como o dado que é salvo no object store é so um json com os atributos
					//aqui para enserir em negociacao eu vou criar uma instancia de Negociacao e passar o valor para esta instancia
					negociacoes.push(new Negociacao(dado._data,dado._quantidade,dado._valor));

					//aqui eu chamo ele passar para o proximo, isso quer dizer ele vai chamar o onsucess novamente, enquanto tiver dado ele ira cair nesse if, quando não houver mais ele ira cair no else
					atual.continue();
				}else{
					resolve(negociacoes);
				}
			};

			cursor.onerror = e => {
				console.log(e.target.error.name);
				reject('Não foi possivel lista as negociações');
			}	

    		/*
    		let transaction = connection.transaction(['negociacoes'],'readwrite');

			let store = transaction.objectStore('negociacoes');

				}else{
					console.log(negociacoes);
				}
			};
			*/

    	});
    }

    apagaTodos(){

    	return new Promise((resolve,reject) => {

    		let request = this
                ._connection
                .transaction([this._store],"readwrite")
                .objectStore(this._store)
                .clear();

            request.onsuccess = e => resolve('Negociações apagadas com sucesso');

            request.onerror = e => {

            	console.log(e.target.error);
            	reject('Não foi possivel apagar  as negociações');
            };	
    	});
    }
}