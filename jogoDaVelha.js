let tabuleiro = ["", "", "", "", "", "", "", "", "", ""];
let jogoAtivo = true;

const combinacoesVitoria = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function exibirTabuleiro() {
    return `${tabuleiro[0] || 0} | ${tabuleiro[1] || 1} | ${tabuleiro[2] || 2}
    ---+---+---
    ${tabuleiro[3] || 3} | ${tabuleiro[4] || 4} | ${tabuleiro[5] || 5}
    ---+---+---
    ${tabuleiro[6] || 6} | ${tabuleiro[7] || 7} | ${tabuleiro[8] || 8}`;
}

function jogadaComputador() {
    let posicoesLivres = [];

    for (let i = 0; i < tabuleiro.length; i++) {
        if (tabuleiro[i] = "") {
            posicoesLivres.push(i);
        }
    }

    if (posicoesLivres.length > 0) {
        let indiceSorteado = Math.floor(Math.random() * posicoesLivres.length);
        let escolhaComputador = posicoesLivres[indiceSorteado]

        tabuleiro[escolhaComputador] = "O"
        alert(`O computador jogou na posição ${escolhaComputador}`);
    }
}

function checarFimJogo(jogador) {
    for (let combinacao of combinacoesVitoria) {
        let[a, b, c] = combinacao;
        if (tabuleiro[a] !== "" && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]){
            alert(`Parabéns, você jogagor ${jogador} venceu!`)
        }
    }

    if(!tabuleiro.includes("")) {
        alert(`IIIIHHH rapaz, deu velha!`)
        return true;
    }

    return false;
}

while (jogoAtivo) {
    let mensagem = `Seu simbolo é [X] | Computador é [O]\n${exibirTabuleiro()}\nDigite o numero da posição (0 a 8)`;
    let entrada = prompt(mensagem);

    if (entrada === null) {
        console.log("jogo encerrado antes da hora");
        break;
    }

    let posicao = parseInt(entrada);

    if (isNaN(posicao) || posicao < 0 || posicao > 8 || tabuleiro[posicao] !== "") {
        alert("Posição inválida ou já ocupada! Escolha um número livre de 0 a 8.");
        continue;
    }

    tabuleiro[posicao] = "X";

    if (checarFimJogo("X")) {
        jogoAtivo = false;
        break;
    }

    jogadaComputador();

    if (checarFimJogo("O")) {
        jogoAtivo = false;
        break;
    }
}