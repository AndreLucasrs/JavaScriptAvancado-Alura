import {currentInstance} from './controllers/NegociacaoController';
import {} from './polyfill/fetch';

let negociacaoController = currentInstance();
document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
document.querySelector('[type=button]').onclick = negociacaoController.apaga.bind(negociacaoController);


/*
Indicamos em System.import que boot.js será o primeiro módulo a ser carregado. Observe que não precisamos mais nos preocupar com a ordem de carregamentos de scripts, o loader vai resolver tudo para nós.

ES2015 e módulos
Apesar de fazer parte da especificação, ainda não há consenso a respeito de como os scripts devem ser carregados pelo navegador. É por isso que para usarmos o sistema de módulos oficial do JavaScript precisamos utilizar loaders de terceiros, que nada mais são do que scripts especiais que farão o carregamento dos nossos módulos. Neste treinamento, utilizaremos o SystemJs, um carregador de módulos universal que suporta módulos do ES2015.

Além do loader, ajustes em nosso código devem ser feitos para adequá-lo ao loader utilizado. Resumindo: para que possamos utilizar os módulos do ES2015, precisamos utilizar um loader e transcompilar nosso código.

Antes de baixarmos nosso loader, vamos primeiro configuração Babel para que adeque nosso código ao Systemjs


Babel e transcompilação de módulos
Hoje, temos apenas configurado o preset es2015 no arquivo .babelrc. Ele garante a compilação do nosso código para ES5. Contudo, este preset não esta preparado para transcompilar módulos para o Systemjs.

Refatorando código com import e export

Veja que usamos import seguido de {View}. Colocamos o nome da classe que desejamos importar de um módulo entre chaves. Em seguida, usamos a instrução from apontando para o local do módulo. Encare cada script nosso agora como um módulo, ou seja, View.js é um módulo. Contudo, do jeito que esta, não funcionará. Porque tudo que estiver entre {} deve ser exportado pelo módulo. Se abrirmos View.js em nenhum momento deixamos claro que a classe View pode ser importada. Corrigimos isso facilmente adicionando a instrução export antes da definição da classe
*/