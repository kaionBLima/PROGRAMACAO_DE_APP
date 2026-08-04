let palavra_secreta = "MAGICA";
let tentativas = 6;
let letras_chutadas = [];
let erros = 0;

function mostrarPalavra() {
  let resultado = "";
  
  for (let i = 0; i < palavra_secreta.length; i++) {
    let letraAtual = palavra_secreta[i];
    
    if (letras_chutadas.includes(letraAtual)) {
      resultado = resultado + letraAtual + " ";
    } else {
      resultado = resultado + "_ ";
    }
  }
  
  return resultado;
}

while (erros < tentativas && mostrarPalavra().includes("_")) {
  
  // CORRIGIDO: Troca de ' ' por ` ` para o JS entender as variáveis
  let mensagem = `Palavra: ${mostrarPalavra()}\nErros: ${erros}/${tentativas}\nDigite uma letra:`;
  let entrada = prompt(mensagem);
  
  if (entrada === null) {
    console.log("Jogo cancelado!");
    break;
  }
  
  let letra = entrada.toUpperCase();
  
  if (letra.length != 1) {
    alert("Por favor, digite apenas UMA letra por vez!");
    continue;
  }
  
  if (letras_chutadas.includes(letra)) {
    alert("Você já tentou essa letra! Tente outra.");
    continue;
  }
  
  letras_chutadas.push(letra);
  
  if (!palavra_secreta.includes(letra)) {
    erros++;
    alert(`Que pena! A letra ${letra} não está na palavra`);
  } else {
    alert(`Boaaa! A letra ${letra} existe na palavra`);
  }
}

if (!mostrarPalavra().includes("_")) {
    alert(`Parabéns! Você venceu! A palavra era: ${palavra_secreta}`);
} else if (erros >= tentativas) {
    alert(`Você atingiu o limite de erros. A palavra era: ${palavra_secreta}`);
}