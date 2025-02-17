/** @typedef {Object} Piece
 *  @property {number} position
 */

/** @typedef {Object} Player
 *  @property {string} name
 *  @property {Piece[]} pieces
 *  @property {boolean} inBase
 *  @property {number} consecutiveRolls
 */

/** @type {Player} */
const player1 = { name: "Jogador 1", pieces: [{ position: 0 }, { position: 0 }, { position: 0 }, { position: 0 }], inBase: true, consecutiveRolls: 0 };
/** @type {Player} */
const player2 = { name: "Jogador 2", pieces: [{ position: 0 }, { position: 0 }, { position: 0 }, { position: 0 }], inBase: true, consecutiveRolls: 0 };
/** @type {Player} */
const player3 = { name: "Jogador 3", pieces: [{ position: 0 }, { position: 0 }, { position: 0 }, { position: 0 }], inBase: true, consecutiveRolls: 0 };
/** @type {Player} */
const player4 = { name: "Jogador 4", pieces: [{ position: 0 }, { position: 0 }, { position: 0 }, { position: 0 }], inBase: true, consecutiveRolls: 0 };

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

function movePiece(player, pieceIndex) {
  const dice = rollDice();
  const piece = player.pieces[pieceIndex];

  if (piece.position === 0 && dice === 6) {
    // A peça sai da base quando tira 6
    piece.position = 1;
    printToScreen(`${player.name} rolou ${dice} e a peça ${pieceIndex + 1} saiu da base para a posição: ${piece.position}`);
  } else if (piece.position > 0) {
    // A peça avança normalmente
    const previousPosition = piece.position;
    piece.position += dice;

    // Verifica se a nova posição ultrapassou o limite de 20
    if (piece.position > 20) {
      piece.position = 20;
    }

    // Verifica se a nova posição foi ocupada por outra peça
    const occupiedPlayer = players.find(otherPlayer => otherPlayer !== player && otherPlayer.pieces.some(otherPiece => otherPiece.position === piece.position));
    if (occupiedPlayer) {
      // Se a posição já estiver ocupada, a peça do outro jogador volta para a base
      const otherPiece = occupiedPlayer.pieces.find(p => p.position === piece.position);
      printToScreen(`${player.name} rolou ${dice} e a peça ${pieceIndex + 1} caiu na posição já ocupada por ${occupiedPlayer.name}'s peça. A peça de ${occupiedPlayer.name} volta para a base.`);
      otherPiece.position = 0;
    }

    printToScreen(`${player.name} rolou ${dice} e a peça ${pieceIndex + 1} está na posição: ${piece.position}`);
  }

  // Verifica se todas as peças do jogador chegaram à posição 20
  if (player.pieces.every(piece => piece.position === 20)) {
    printToScreen(`${player.name} venceu! Todas as suas peças chegaram à posição 20!`);
    resetGame();
  }
}

function switchPlayer() {
  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
}

function playTurn() {
  const player = players[currentPlayerIndex];

  // Pergunta ao jogador qual peça ele quer mover (pode ser implementado com uma interface de escolha)
  const pieceIndex = Math.floor(Math.random() * 4); // Simulando a escolha de uma peça aleatória

  movePiece(player, pieceIndex);

  // Se o jogador rolou 6, ele pode jogar novamente (máximo de 3 vezes)
  if (players[currentPlayerIndex].consecutiveRolls < 3 && rollDice() === 6) {
    players[currentPlayerIndex].consecutiveRolls++;
  } else {
    players[currentPlayerIndex].consecutiveRolls = 0; // Passa a vez
    switchPlayer();
  }
}

function resetGame() {
  players.forEach(player => {
    player.pieces.forEach(piece => piece.position = 0); // Reseta as posições das peças
    player.consecutiveRolls = 0; // Reseta as jogadas consecutivas
  });
  currentPlayerIndex = 0;
  printToScreen("Jogo reiniciado!");
}

// Adiciona o evento ao botão "Jogar Turno"
document.getElementById("playTurnBtn").addEventListener("click", playTurn);
