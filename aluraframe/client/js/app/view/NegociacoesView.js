class NegociacoesView extends View{

	constructor(elemento){

		super(elemento);
	}

	template(model){
		//usando template String
		//template String js, usas-se isso ` `
		//quando uso o join eu coloco como criterio junção uma String em branco,
		//ele ira varrer a lista e criar uma nova lista, mas essa nova lista so vai ter String
		//e no final eu dou um join, ae vai virar uma String com todos os itens do array concatenados
		return `
					<table class="table table-hover table-bordered">
        				<thead>
            				<tr>
                				<th onclick="negociacaoController.ordena('data')">DATA</th>
                                <th onclick="negociacaoController.ordena('quantidade')">QUANTIDADE</th>
                                <th onclick="negociacaoController.ordena('valor')">VALOR</th>
                                <th onclick="negociacaoController.ordena('volume')">VOLUME</th>
            				</tr>
        				</thead>

        				<tbody>
        					${model.negociacoes.map(n => 

        						`
        							<tr>
        								<td>${DateHelper.dataParaTexto(n.data)}</td>
        								<td>${n.quantidade}</td>
        								<td>${n.valor}</td>
        								<td>${n.volume}</td>
        							</tr> 
        						`
        					).join('')}
        				</tbody>
        
        				<tfoot>
        					<td colspan="3"></td>
    						<td>
                                ${model.volumeTotal}
                            </td>
        				</tfoot>
    				</table>
				`;
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

}