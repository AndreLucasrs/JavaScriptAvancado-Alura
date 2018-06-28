class NegociacaoController{

	constructor(){
		//Se declaramos as variáveis usando o let, estas ganharam um escopo de bloco	
		//estamos informando que o querySelector irá para a variável $, mas ainda manterá uma associação com document
		let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade =  $('#quantidade');
        this._inputValor = $('#valor');
		
	}

	adiciona(event){
		//isso cancela a atualização da pagina na hora de submeter
		event.preventDefault();

        //Quando geramos o array com ano, mês e dia, ele transforma cada item em uma string e adiciona o separado. Só que quando passamos o array '2016', '11', '12', o que é o reagrupamento por debaixo dos panos de cada item usando o separador ,.
        //Existe no array o método join(), que une todos os itens e depois, forma uma string com separadores.
        //let data = new Date(this._inputData.value.split('-'));
        //... (reticências) posicionado antes do this, com este spread operator, indicamos que o array será desmembrado - e o primeiro item do array, e cada parâmetro do Date será posicionado na mesma ordem no construtor
  		let data = new Date(...this._inputData
            .value.split('-')
            .map((item,indice) => item - indice % 2 )
            //.map(function(item, indice) {
            //    return item - indice % 2;
            //}));
        );
        let negociacao = new Negociacao(
            data,
            this._inputQuantidade.value,
            this._inputValor.value
        );

  		console.log(negociacao);

  		let diaMesAno = negociacao.data.getDate()+ '/'
  						+ (negociacao.data.getMonth()+1)
  						+ '/' + negociacao.data.getFullYear();

  		console.log(diaMesAno);
	}
}