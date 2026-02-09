const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

(async () => {
  let palpite;

  const sorteio = Math.floor(Math.random() * 10);

  do {
    palpite = parseInt(await new Promise(resolve => {
      rl.question("Digite um número entre 0 e 9: ", answer => {
        resolve(answer);
      });
    }));

    if (palpite < 0 || palpite > 9 || isNaN(palpite)) {
      console.log("Por favor, digite um número válido entre 0 e 9.");
      continue;
    }

    if (palpite < sorteio) {
      console.log("Tente um número maior!");
    } else if (palpite > sorteio) {
      console.log("Tente um número menor!");
    }
  } while (palpite !== sorteio);

  console.log("Parabéns! Você acertou o número " + palpite + "!");
  rl.close();
})();