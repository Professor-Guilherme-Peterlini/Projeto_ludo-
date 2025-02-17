// filepath: /Users/gui/Desktop/Aulas_Senac/ludo_implement.js
// Jogo básico de Ludo com quatro jogadores e interface simples

/**
 * @typedef {Object} Player
 * @property {string} name
 * @property {number} position
 */

/** @type {Player} */
const player1 = { name: "Jogador 1", position: 0 };
/** @type {Player} */
const player2 = { name: "Jogador 2", position: 0 };
/** @type {Player} */
const player3 = { name: "Jogador 3", position: 0 };
/** @type {Player} */
const player4 = { name: "Jogador 4", position: 0 };

/** @type {Player[]} */
let players = [player1, player2, player3, player4];
let currentPlayerIndex = 0;

const outputDiv = document.getElementById("output");

function printToScreen(message) {
  outputDiv.innerHTML += message + "<br>";
  outputDiv.scrollTop = outputDiv.scrollHeight;
}

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function movePlayer(player) {
  const dice = rollDice();
  player.position += dice;
  if (player.position >= 20) {
    printToScreen(`${player.name} rolou ${dice} e venceu!`);
    resetGame();
  } else {
    printToScreen(`${player.name} rolou ${dice} e está na posição: ${player.position}`);
  }
}

function switchPlayer() {
  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
}

function playTurn() {
  movePlayer(players[currentPlayerIndex]);
  switchPlayer();
}

function resetGame() {
  players.forEach(player => player.position = 0);
  currentPlayerIndex = 0;
  printToScreen("Jogo reiniciado!");
}

// Removendo a simulação automática de 10 rodadas
// Agora, o jogo é interativo via botão "Jogar Turno"
document.getElementById("playTurnBtn").addEventListener("click", playTurn);

/*
Tutorial Passo a Passo:

1. **Definir Jogadores:** Crie quatro jogadores com nome e posição inicial 0.
2. **Configurar Lista de Jogadores:** Use um array para gerenciar a sequência de turnos.
3. **Criar Dado:** Implemente a função `rollDice` para gerar números entre 1 e 6.
4. **Mover Peças:** `movePlayer` move o jogador conforme o valor do dado e verifica a vitória.
5. **Alternar Turno:** `switchPlayer` passa o turno para o próximo jogador.
6. **Iniciar o Jogo:** `playTurn` coordena as ações de jogar o dado, mover a peça e trocar o turno.
7. **Reiniciar o Jogo:** A função `resetGame` redefine o estado do jogo ao fim de uma vitória.
8. **Testar a Lógica:** O botão "Jogar Turno" permite simular uma rodada por clique.
*/
