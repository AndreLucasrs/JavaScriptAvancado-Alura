import {View} from './View';

export class MensagemView extends View{

	constructor(elemento){
		
		super(elemento);
	}

	 template(model){
	 	return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : `<p></p>`;
	 }

}

/*

Nós explicitamos que queremos importar algo do módulo View. 
Relembrando, cada script é considerado um módulo por padrão e todo conteúdo não cairá no escopo global. 
Como View está na mesma pasta que MensagemView, usamos apenas o ./, 
sem precisar especificar a extensão no fim. 
Também, especificamos dentro das chaves o que queremos importar (View). 
Observe que também exportamos o MensagemView, 
porque ela será importada pelo NegociacaoController.js

*/