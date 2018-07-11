class Mensagem{

//texto='', isso quer dizer que o valor padrão do parametro é '',
//vc pode colcar esse valor padrão é metodos, construtores e função
//isso serve para no caso de algo como um Mensagem mensage = new Mensagem()
//vc não fica obrigado a passar o parametro, pq ele ja tem um padrão
	constructor(texto='') {

        this._texto = texto;
    }

    get texto() {

        return this._texto;
    }

    set texto(texto) {

        this._texto = texto;
    }
}