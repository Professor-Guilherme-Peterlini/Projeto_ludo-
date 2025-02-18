// filepath: /Users/gui/Desktop/Aulas_Senac/ludo_implement.js
// Jogo básico de Ludo com quatro jogadores e interface simples

/**
/**
 * /**
 * /**
 * /**
 * /**
 * /**
 * /**
 * /**
 * /**
 * /**
 * /**
 * /**
 * @typedef {Object} Player
 * @property {string} name
 * @property {number[]} positions // Agora cada jogador tem 4 posições (uma para cada peça)
 */

/** @type {Player} */
const player1 = { name: "Jogador 1", positions: [0, 0, 0, 0] };
/** @type {Player} */
const player2 = { name: "Jogador 2", positions: [0, 0, 0, 0] };
/** @type {Player} */
const player3 = { name: "Jogador 3", positions: [0, 0, 0, 0] };
/** @type {Player} */
const player4 = { name: "Jogador 4", positions: [0, 0, 0, 0] };

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

function movePlayerPiece(player, pieceIndex) {
  const dice = rollDice();
  
  // Se a peça ainda está na base (posição 0), precisa de um 6 para sair
  if (player.positions[pieceIndex] === 0) {
    if (dice === 6) {
      player.positions[pieceIndex] = 1; // Vai para a posição 1
      printToScreen(`${player.name} com a peça ${pieceIndex + 1} rolou ${dice} e saiu da base para a posição 1!`);
      return false; // Não é considerado vitória ainda, o jogador não avançou para a próxima posição
    } else {
      printToScreen(`${player.name} com a peça ${pieceIndex + 1} rolou ${dice}, mas precisa de um 6 para sair da base.`);
      return false; // O jogador não pode mover a peça ainda
    }
  } else {
    // Se já saiu da base, pode avançar normalmente com qualquer número
    player.positions[pieceIndex] += dice;
    if (player.positions[pieceIndex] >= 20) {
      player.positions[pieceIndex] = 20; // Limita a posição à 20
      printToScreen(`${player.name} com a peça ${pieceIndex + 1} rolou ${dice} e chegou à posição 20!`);
      return true; // Retorna true quando a peça chega à posição 20
    } else {
      printToScreen(`${player.name} com a peça ${pieceIndex + 1} rolou ${dice} e está na posição: ${player.positions[pieceIndex]}`);
      return false;
    }
  }
}


function checkIfPlayerWon(player) {
  return player.positions.every(position => position === 20); // Verifica se todas as peças do jogador chegaram à posição 20
}

function switchPlayer() {
  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
}

function playTurn() {
  let player = players[currentPlayerIndex];
  let pieceIndex = 0;

  // Tenta mover a primeira peça que ainda não atingiu a posição 20
  for (let i = 0; i < player.positions.length; i++) {
    if (player.positions[i] < 20) {
      pieceIndex = i;
      break;
    }
  }

  // Move a peça
  movePlayerPiece(player, pieceIndex);

  // Verifica se o jogador venceu
  if (checkIfPlayerWon(player)) {
    printToScreen(`${player.name} venceu o jogo! Todas as peças chegaram à posição 20.`);
    resetGame();
    return;
  }

  switchPlayer();
}

function resetGame() {
  players.forEach(player => player.positions = [0, 0, 0, 0]);
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
