export class View{

	constructor(elemento){

		this._elemento = elemento;
	}

	template(){

		throw new Error("O método template deve ser implementado");
	}

	update(model){
		//quando vc passa uma String para o innerHTML, ele converte para elemento do DOM
		this._elemento.innerHTML = this.template(model);
	}
}

/*

Porque usar o export

A plataforma Node.js resolveu este problema adotando padrão CommonJS para criação de módulos, 
ainda há bibliotecas como RequireJS que usam o padrão AMD 
(Assincronous Module Definition). 
Contudo, o ES2015 especificou seu próprio sistema de módulos 
que resolve tanto o problema do escopo global quanto o de carregamento de scripts.

*/