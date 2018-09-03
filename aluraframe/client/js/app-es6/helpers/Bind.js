import {ProxyFactory} from '../services/ProxyFactory.js';

export class Bind {

	//REST operator ...props, esses ... é o rest operator
	//Para gerarmos um array com n parâmetros, devemos usar o REST apenas no último, outro vantajoso recurso do ECMAScript
	// primeiro parâmetro recebido pelo Bind é o model, o segundo é a view, e a partir do terceiro, 
	//eles caem dentro do ...props - podendo ser diversos, como um array.
	// No nosso caso, ...props é um array com duas posições (adiciona e esvazia). 
	//É isso que o create() do ProxyFactory espera receber. 
	//Com a pequena adição do REST. Isto também nos permite fazer uma associação com apenas um parâmetro, 
	//como no caso do texto de _mensagem, sem colocá-lo em um array.
	constructor(model,view,...props){
		let proxy = ProxyFactory.create(model, props, model =>view.update(model));
		view.update(model);
        	
        return proxy;	
	}
}