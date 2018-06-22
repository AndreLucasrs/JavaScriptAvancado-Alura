class NegociacaoController{

	adiciona(){
		//isso cancela a atualização da pagina na hora de submeter
		event.preventDefault();
		alert("chamei ação no controller");

		//Se declaramos as variáveis usando o let, estas ganharam um escopo de bloco	
		let $ = document.querySelector;
		let inputData = $('#data');
		let inputQuantidade = $('#quantidade');
		let inputValor = 4('#valor');

		console.log(inputData.value);
		console.log(inputQuantidade.value);
		console.log(inputValor.value);

	}

}