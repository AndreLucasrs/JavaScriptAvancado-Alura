export class DateHelper {

	constructor(){
		throw new Error("Esta classe não pode ser instanciada");
	}


	static dataParaTexto(data){
		//template String
		return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
	}

	static textoParaData(texto){
		//expressão regular para testar se a data esta vindo no formato esperado,
		//fail fast
		if(!/\d{2}\/\d{2}\/\d{4}/.test(texto)) {
			throw new Error("Deve estar no formato dd-mm-aaaa");
		}	
		//Quando geramos o array com ano, mês e dia, ele transforma cada item em uma string e adiciona o separado. Só que quando passamos o array '2016', '11', '12', o que é o reagrupamento por debaixo dos panos de cada item usando o separador ,.
        //Existe no array o método join(), que une todos os itens e depois, forma uma string com separadores.
        //let data = new Date(this._inputData.value.split('-'));
        //... (reticências) posicionado antes do this, com este spread operator, indicamos que o array será desmembrado - e o primeiro item do array, e cada parâmetro do Date será posicionado na mesma ordem no construtor
		//return new Date(...texto.split('-').map((item,indice) => item - indice % 2 ));
		return new Date(...texto.split('/').reverse().map((item, indice) => item - indice % 2));
		            //.map(function(item, indice) {
		            //    return item - indice % 2;
		            //}));
	}
}