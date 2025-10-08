let players = [
  { name: "Player 1", score: 0, log: [] },
  { name: "Player 2", score: 0, log: [] }
];

let plusTwoUsed = false;

function getPositions() {
  const scores = players.map(p => p.score);
  const allEqual = scores.every(s => s === scores[0]);
  if (allEqual) return Array(players.length).fill('');

  const sorted = [...players].map((p, i) => ({ ...p, index: i }))
    .sort((a, b) => b.score - a.score);

  const positions = Array(players.length).fill('');
  let rank = 1;

  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i].score !== sorted[i - 1].score) {
      rank = i + 1;
    }
    const suffix = rank === 1 ? 'st' : rank === 2 ? 'nd' : rank === 3 ? 'rd' : 'th';
    positions[sorted[i].index] = `${rank}${suffix}`;
  }

  return positions;
}

function renderPlayers() {
  const container = document.getElementById('players');
  container.innerHTML = '';
  const allowSpecialMoves = players.length > 2;
  const positions = getPositions();

  players.forEach((player, index) => {
    const logString = player.log.join(' ');
    container.innerHTML += `
      <div class="player">
        <button class="remove-btn" onclick="removePlayer(${index})">–</button>
        <input type="text" value="${player.name}" onchange="updateName(${index}, this.value)" />
        <div class="score">
          ${player.score}
          ${positions[index] ? `<span class="position">${positions[index]}</span>` : ''}
        </div>
        <button class="btn-plus1" style="${allowSpecialMoves ? '' : 'font-size: 20px; padding: 12px 10px;'}" onclick="changeScore(${index}, 1)">+1</button>
        ${allowSpecialMoves ? `
          <button class="btn-plus2" onclick="changeScore(${index}, 2)" ${plusTwoUsed ? 'disabled' : ''}>+2</button>
          <button class="btn-minus1" onclick="changeScore(${index}, -1)">-1</button>
          <div class="log">Score Log: ${logString}</div>
        ` : ''}
      </div>
    `;
  });
}

function updateName(index, newName) {
  players[index].name = newName;
}

function changeScore(index, amount) {
  players[index].score += amount;
  players[index].log.push((amount > 0 ? '+' : '') + amount);
  if (amount === 2) {
    plusTwoUsed = true;
  }
  renderPlayers();
}

function addPlayer() {
  players.push({ name: `Player ${players.length + 1}`, score: 0, log: [] });
  renderPlayers();
}

function removePlayer(index) {
  players.splice(index, 1);
  renderPlayers();
}

function resetGame() {
  if (players.length > 2) {
    players.sort((a, b) => b.score - a.score);
  }

  players.forEach(player => {
    player.score = 0;
    player.log = [];
  });

  plusTwoUsed = false;
  renderPlayers();
}

renderPlayers();
