class NegociacaoController{

	adiciona(event){
		//isso cancela a atualização da pagina na hora de submeter
		event.preventDefault();

		//estamos informando que o querySelector irá para a variável $, mas ainda manterá uma associação com document
		let $ = document.querySelector.bind(document);
		//Se declaramos as variáveis usando o let, estas ganharam um escopo de bloco	
        let inputData = $('#data');
        let inputQuantidade =  $('#quantidade');
        let inputValor = $('#valor');

        console.log(inputData.value);
        console.log(inputQuantidade.value);
        console.log(inputValor.value);

	}
}