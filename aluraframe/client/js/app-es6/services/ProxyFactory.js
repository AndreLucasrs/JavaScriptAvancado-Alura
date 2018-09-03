export class ProxyFactory{

    static create(objeto,props,acao){

        //O proxy é um objeto que ira ser a copia de negociacao, ele irar encapsular o objeto real
        //e com ele a gente pode alterar codigo de infra sem problema
        //proxy se baseia em um padrão de projeto
        return new Proxy(objeto,{

            //O target é o objeto real, que é encapsulado pelo proxy.
            //O prop é a propriedade que está sendo lida.
            //O receiver é uma referência ao próprio proxy.
            get(target,prop,receiver){
                
                //ele verifica se dentro do vetor tem um prop, o includes, esta sendo isso
                //quando chamado o get ele ira olhar se é um metodo ou uma funcao
                //se for uma funcao ele
                //ele cria uma nova função temporada no proxy
                // e o arguments esta pegando todos os paramentros da chamada que esta fazendo para //cair nesse if
                //nesse caso a linha abaixo lista.adiciona()
                //então o arguments passa esse os parametros para nova função criada 
                //se for um metodo ele retorna o get normal
                if(props.includes(prop) && ProxyFactory._ehFuncao(target[prop])){

                    return function(){

                        console.log(`interceptando ${prop}`);
                        Reflect.apply(target[prop],target,arguments);
                        return acao(target);
                    }
                }
                
                return Reflect.get(target,prop,receiver);
            },

            set(target, prop, value, receiver){

                if(props.includes(prop)) {
                    target[prop] = value;
                    acao(target);
                }
                return Reflect.set(target,prop,value,receiver);  
            }
        });
    }

    static _ehFuncao(func){

        return typeof(func) == typeof(Function);
    }
}