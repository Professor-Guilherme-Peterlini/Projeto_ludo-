// Jogo básico de Ludo com quatro jogadores

// Simulação de dados e movimento básico
const player1 = { name: "Jogador 1", position: 0 };
const player2 = { name: "Jogador 2", position: 0 };
const player3 = { name: "Jogador 3", position: 0 };
const player4 = { name: "Jogador 4", position: 0 };

let players = [player1, player2, player3, player4];
let currentPlayerIndex = 0;

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function movePlayer(player) {
  const dice = rollDice();
  console.log(`${player.name} rolou: ${dice}`);
  player.position += dice;
  if (player.position >= 20) {
    console.log(`${player.name} venceu!`);
    resetGame();
  } else {
    console.log(`${player.name} está na posição: ${player.position}`);
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
  console.log("Jogo reiniciado!");
}

// Simulação de 10 rodadas
for (let i = 0; i < 10; i++) {
  playTurn();
}

/*
Tutorial Passo a Passo:

1. **Definir Jogadores:** Crie quatro jogadores com nome e posição inicial 0.
2. **Configurar Lista de Jogadores:** Use um array para gerenciar a sequência de turnos.
3. **Criar Dado:** Implemente a função `rollDice` para gerar números entre 1 e 6.
4. **Mover Peças:** `movePlayer` move o jogador conforme o valor do dado e verifica a vitória.
5. **Alternar Turno:** `switchPlayer` passa o turno para o próximo jogador.
6. **Iniciar o Jogo:** `playTurn` coordena as ações de jogar o dado, mover a peça e trocar o turno.
7. **Reiniciar o Jogo:** A função `resetGame` redefine o estado do jogo ao fim de uma vitória.
8. **Testar a Lógica:** O loop simula 10 rodadas para verificar o funcionamento básico.

*/

