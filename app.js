let linhaDenumeroSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function mensagemInicial(){
    exibirTextoNaTela('h1','Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 100');
}

mensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (numeroSecreto == chute){
        exibirTextoNaTela('h1','Você Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTetativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`
        exibirTextoNaTela('p', mensagemTetativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if(numeroSecreto > chute){
            exibirTextoNaTela('p', 'número secreto é maior');
        } else {
            exibirTextoNaTela('p',' O número secreto é menor.');
        }
        tentativas++;
        limparCampo()
    }
} 

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementosDaLista = linhaDenumeroSorteados.length;

    if(quantidadeElementosDaLista == numeroLimite){
        linhaDenumeroSorteados = [];
    }

    if (linhaDenumeroSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        linhaDenumeroSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}