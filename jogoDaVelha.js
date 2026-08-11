const readline = require('readline');

class JogoDaVelha {
  constructor() {
    this.tabuleiro = ["", "", "", "", "", "", "", "", ""];
    this.jogoAtivo = true;
    this.combinacoesVitoria = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6]          
    ];
    
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
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
      console.log(`\nO computador jogou na posicao ${escolhaComputador}`);
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
        console.log(`\nParabens, jogador ${jogador} venceu!`);
        console.log(`\n${this.exibirTabuleiro()}`);
        this.jogoAtivo = false;
        this.rl.close();
        return true;
      }
    }

    if (!this.tabuleiro.includes("")) {
      console.log("\nIIIIHHH rapaz, deu velha!");
      console.log(`\n${this.exibirTabuleiro()}`);
      this.jogoAtivo = false;
      this.rl.close();
      return true;
    }

    return false;
  }

  iniciar() {
    if (!this.jogoAtivo) return;

    console.log(`\nSeu simbolo e [X] | Computador e [O]`);
    console.log(`${this.exibirTabuleiro()}`);

    this.rl.question("Digite o numero da posicao (0 a 8): ", (entrada) => {
      let posicao = parseInt(entrada.trim());

      if (isNaN(posicao) || posicao < 0 || posicao > 8 || this.tabuleiro[posicao] !== "") {
        console.log("\nPosicao invalida ou ja ocupada! Escolha um numero livre de 0 a 8.");
        return this.iniciar();
      }

      this.tabuleiro[posicao] = "X";

      if (this.checarFimJogo("X")) {
        return;
      }

      this.jogadaComputador();

      if (this.checarFimJogo("O")) {
        return;
      }

      this.iniciar();
    });
  }
}

const jogo = new JogoDaVelha();
jogo.iniciar();