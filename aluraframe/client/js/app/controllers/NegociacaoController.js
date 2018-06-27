class NegociacaoController{

	constructor(){
		//Se declaramos as variáveis usando o let, estas ganharam um escopo de bloco	
		//estamos informando que o querySelector irá para a variável $, mas ainda manterá uma associação com document
		let $ = document.querySelector.bind(document);
        this.inputData = $('#data');
        this.inputQuantidade =  $('#quantidade');
        this.inputValor = $('#valor');
		
	}

	adiciona(event){
		//isso cancela a atualização da pagina na hora de submeter
		event.preventDefault();

        console.log(this.inputData.value);
        console.log(this.inputQuantidade.value);
        console.log(this.inputValor.value);

	}
}