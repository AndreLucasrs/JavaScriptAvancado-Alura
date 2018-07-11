class View{

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