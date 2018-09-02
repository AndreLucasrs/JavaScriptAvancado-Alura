//o nome arquivo tem letra maiuscula no começo, para deixar claro que isso é uma classe
//pode pegar os Conceitos de OO, aprendidos em java e aplicar aqui para o entendimento
class Negociacao {

	//metodo construtor
	constructor(date, quantidade, valor){
		//o underline _ é uma convensão para o programador, dizendo que essas propriedades
		//so podem ser acessados pelos proprios metodos da classe, ninguem de fora

		this._data = new Date(date.getTime());
		this._quantidade = quantidade;
		this._valor = valor;

		//congelaremos o objeto
		//isso vai encapsular o objeto, não totalmente, mas garante ja alguma coisa
		//isso evitara de ser modificada
		//tornando imutavel
		Object.freeze(this);
	}

	//Estamos criando uma propriedade getter de acesso à leitura
	//E mesmo sendo um método, poderemos acessá-lo como uma propriedade.
	//Mas, debaixo dos panos, ele continuará sendo executado como um método
	//metodo acessores
	get volume(){
		return this._quantidade * this._valor;
	}

	get data(){
		return new Date(this._data.getTime());
	}

	get quantidade(){
		return this._quantidade;
	}

	get valor(){
		return this._valor;
	}

	isEquals(outraNegociacao) {        
        return JSON.stringify(this) == JSON.stringify(outraNegociacao)
    }

    //JSON.stringify ele serializa nosso objeto e verifica se eles tem o valor igual
}