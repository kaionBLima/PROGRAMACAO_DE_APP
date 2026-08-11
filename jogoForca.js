const readline = require('readline');

class JogoDaForca {
  constructor(palavraSecreta, maxTentativas = 6) {
    this.palavraSecreta = palavraSecreta.toUpperCase();
    this.maxTentativas = maxTentativas;
    this.letrasChutadas = [];
    this.erros = 0;
    
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  mostrarPalavra() {
    let resultado = "";

    for (let i = 0; i < this.palavraSecreta.length; i++) {
      let letraAtual = this.palavraSecreta[i];

      if (this.letrasChutadas.includes(letraAtual)) {
        resultado += letraAtual + " ";
      } else {
        resultado += "_ ";
      }
    }

    return resultado.trim();
  }

  estaCompleta() {
    return !this.mostrarPalavra().includes("_");
  }

  jaPerdeu() {
    return this.erros >= this.maxTentativas;
  }

  jogar() {
    if (this.jaPerdeu()) {
      console.log(`\nVoce atingiu o limite de erros. A palavra era: ${this.palavraSecreta}`);
      this.rl.close();
      return;
    }

    if (this.estaCompleta()) {
      console.log(`\nParabens! Voce venceu! A palavra era: ${this.palavraSecreta}`);
      this.rl.close();
      return;
    }

    console.log(`\n----------------------------------------`);
    console.log(`Palavra: ${this.mostrarPalavra()}`);
    console.log(`Erros: ${this.erros}/${this.maxTentativas}`);
    console.log(`Letras tentadas: ${this.letrasChutadas.join(", ")}`);

    this.rl.question("Digite uma letra: ", (entrada) => {
      let letra = entrada.trim().toUpperCase();

      if (letra.length !== 1) {
        console.log("\nAviso: Por favor, digite apenas UMA letra por vez!");
        return this.jogar();
      }

      if (this.letrasChutadas.includes(letra)) {
        console.log("\nAviso: Voce ja tentou essa letra! Tente outra.");
        return this.jogar();
      }

      this.letrasChutadas.push(letra);

      if (!this.palavraSecreta.includes(letra)) {
        this.erros++;
        console.log(`\nIncorreto! A letra ${letra} nao esta na palavra.`);
      } else {
        console.log(`\nCorreto! A letra ${letra} existe na palavra.`);
      }

      this.jogar();
    });
  }
}

const jogo = new JogoDaForca("MAGICA", 6);
jogo.jogar();