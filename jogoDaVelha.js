class JogoDaVelha {
  constructor() {
    this.tabuleiro = ["", "", "", "", "", "", "", "", ""];
    this.jogoAtivo = true;
    this.combinacoesVitoria = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6]             
    ];
  }

  exibirTabuleiro() {
    return `${this.tabuleiro[0] || 0} | ${this.tabuleiro[1] || 1} | ${this.tabuleiro[2] || 2}
---+---+---
${this.tabuleiro[3] || 3} | ${this.tabuleiro[4] || 4} | ${this.tabuleiro[5] || 5}
---+---+---
${this.tabuleiro[6] || 6} | ${this.tabuleiro[7] || 7} | ${this.tabuleiro[8] || 8}`;
  }

  jogadaComputador() {
    let posicoesLivres = [];

    for (let i = 0; i < this.tabuleiro.length; i++) {
      if (this.tabuleiro[i] === "") {
        posicoesLivres.push(i);
      }
    }

    if (posicoesLivres.length > 0) {
      let indiceSorteado = Math.floor(Math.random() * posicoesLivres.length);
      let escolhaComputador = posicoesLivres[indiceSorteado];

      this.tabuleiro[escolhaComputador] = "O";
      alert(`O computador jogou na posição ${escolhaComputador}`);
    }
  }

  checarFimJogo(jogador) {
    for (let combinacao of this.combinacoesVitoria) {
      let [a, b, c] = combinacao;
      if (
        this.tabuleiro[a] !== "" &&
        this.tabuleiro[a] === this.tabuleiro[b] &&
        this.tabuleiro[a] === this.tabuleiro[c]
      ) {
        alert(`Parabéns, jogador ${jogador} venceu!`);
        return true;
      }
    }

    if (!this.tabuleiro.includes("")) {
      alert("IIIIHHH rapaz, deu velha!");
      return true;
    }

    return false;
  }

  iniciar() {
    while (this.jogoAtivo) {
      let mensagem = `Seu símbolo é [X] | Computador é [O]\n${this.exibirTabuleiro()}\nDigite o número da posição (0 a 8):`;
      let entrada = prompt(mensagem);

      if (entrada === null) {
        console.log("Jogo encerrado antes da hora");
        break;
      }

      let posicao = parseInt(entrada);

      if (isNaN(posicao) || posicao < 0 || posicao > 8 || this.tabuleiro[posicao] !== "") {
        alert("Posição inválida ou já ocupada! Escolha um número livre de 0 a 8.");
        continue;
      }

      this.tabuleiro[posicao] = "X";

      if (this.checarFimJogo("X")) {
        this.jogoAtivo = false;
        break;
      }

      this.jogadaComputador();

      if (this.checarFimJogo("O")) {
        this.jogoAtivo = false;
        break;
      }
    }
  }
}

const jogo = new JogoDaVelha();
jogo.iniciar();
