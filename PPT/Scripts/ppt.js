
let placar = JSON.parse(localStorage.getItem('placar')) || { vitorias: 0, derrotas: 0, empates: 0};
            
atualizaPlacar();

function resetarPlacar(){
    placar.vitorias = 0;
    placar.derrotas = 0;
    placar.empates = 0;
    localStorage.removeItem('placar')

    atualizaPlacar();
}

function escolha(){
    let escolhaCPU = Math.random();
    let escolha;

    if (escolhaCPU <= 1/3){
        escolha = 'Pedra';
    } else if (escolhaCPU >= 2/3){
        escolha = 'Tesoura';
    } else {
        escolha = 'Papel';
    }

    return escolha;
}

function game(escolhaJogador){

    const escolhaCPU = escolha();
    let resultado;

    if (escolhaJogador === escolhaCPU) {
        resultado = `Empate!`;
        placar.empates++;
        atualizaResultado(resultado);
        atualizaJogadas(escolhaJogador, escolhaCPU);
    } else if (
        (escolhaJogador === 'Pedra' && escolhaCPU === 'Tesoura') ||
        (escolhaJogador === 'Papel' && escolhaCPU === 'Pedra') ||
        (escolhaJogador === 'Tesoura' && escolhaCPU === 'Papel')
    ) {
        resultado = `Você venceu!`;
        placar.vitorias++;
        atualizaResultado(resultado);
        atualizaJogadas(escolhaJogador, escolhaCPU);
    } else {
        resultado = `Você perdeu!`;
        placar.derrotas++;
        atualizaResultado(resultado);
        atualizaJogadas(escolhaJogador, escolhaCPU);
    }

    localStorage.setItem('placar', JSON.stringify(placar));

    atualizaPlacar();

}

function atualizaPlacar(){
    document.querySelector('.placar-jogo').innerHTML = `Vitorias: ${placar.vitorias} Derrotas: ${placar.derrotas} Empates: ${placar.empates}`;
}

function atualizaResultado(resultado){
    document.querySelector('.resultado').innerHTML = `${resultado}`;
}

function atualizaJogadas(jogador, maquina){
    document.querySelector('.jogadas').innerHTML = `Você escolheu <img class="icones" src="Imagens/${jogador}-emoji.png" alt=""> - Máquina escolheu <img class="icones" src="Imagens/${maquina}-emoji.png" alt="">`;
}