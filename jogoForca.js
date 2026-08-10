class JogoDaForca {
  constructor(palavraSecreta, maxTentativas = 6) {
    this.palavraSecreta = palavraSecreta.toUpperCase();
    this.maxTentativas = maxTentativas;
    this.letrasChutadas = [];
    this.erros = 0;
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

    return resultado;
  }

  estaCompleta() {
    return !this.mostrarPalavra().includes("_");
  }

  jaPerdeu() {
    return this.erros >= this.maxTentativas;
  }

  jogar() {
    while (!this.jaPerdeu() && !this.estaCompleta()) {
      let mensagem = `Palavra: ${this.mostrarPalavra()}\nErros: ${this.erros}/${this.maxTentativas}\nDigite uma letra:`;
      let entrada = prompt(mensagem);

      if (entrada === null) {
        console.log("Jogo cancelado!");
        return;
      }

      let letra = entrada.toUpperCase();

      if (letra.length !== 1) {
        alert("Por favor, digite apenas UMA letra por vez!");
        continue;
      }

      if (this.letrasChutadas.includes(letra)) {
        alert("Você já tentou essa letra! Tente outra.");
        continue;
      }

      this.letrasChutadas.push(letra);

      if (!this.palavraSecreta.includes(letra)) {
        this.erros++;
        alert(`Que pena! A letra ${letra} não está na palavra`);
      } else {
        alert(`Boaaa! A letra ${letra} existe na palavra`);
      }
    }

    if (this.estaCompleta()) {
      alert(`Parabéns! Você venceu! A palavra era: ${this.palavraSecreta}`);
    } else if (this.jaPerdeu()) {
      alert(`Você atingiu o limite de erros. A palavra era: ${this.palavraSecreta}`);
    }
  }
}

const jogo = new JogoDaForca("MAGICA", 6);
jogo.jogar();
