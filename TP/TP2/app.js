import createDeck from "./Card.js";

const MAX_BANK_CARD_VALUE = 17;
const MIN_ACE_VALUE = 1;
const MAX_ACE_VALUE = 11;
const ACE_SYMBOL = "A";
const BLACKJACK = 21;

const game = {
  playerBet: 0,
  bankBet: 0,
};

const player = {
  name: "player",
  level: 0,
  money: 100,
  cards: [],
};

const bank = {
  name: "bank",
  level: 0,
  money: 100,
  cards: [],
};

const DEFAULT_BANK_BET = 0.2 * bank.money;

let deck = [];

function init() {
  player.cards = [];
  player.level = 0;
  bank.cards = [];
  bank.level = 0;

  game.bankBet = DEFAULT_BANK_BET;

  let playerBet = -1;
  while (playerBet < 0 || playerBet > player.money) {
    playerBet = eval(prompt(`Enter bet, under ${player.money}`));
    console.log(playerBet);
  }
  game.playerBet = playerBet;

  deck = createDeck();
  play(bank);
  document.getElementById("play").addEventListener("click", draw);
  document.getElementById("end").addEventListener("click", endTurn);
  document.querySelector(".result").style.display = "none";

  document.querySelector(".result").innerHTML = "";
  update();
}

function play(player) {
  const card = deck.pop();
  if (player.name !== "bank" && card.value === ACE_SYMBOL) {
    let aceScore;
    while (aceScore !== MIN_ACE_VALUE && aceScore !== MAX_ACE_VALUE) {
      aceScore = eval(prompt(`Choose ${MIN_ACE_VALUE} or ${MAX_ACE_VALUE}`));
    }
    card.score = aceScore;
  }
  player.level += card.score;

  player.cards.push(card);
  update();
  if (player.level > BLACKJACK) result();
}
function update() {
  document.getElementById("playerMoney").innerHTML = player.money;
  document.getElementById("bankMoney").innerHTML = bank.money;
  document.getElementById("playerLevel").innerHTML = player.level;
  document.getElementById("bankLevel").innerHTML = bank.level;

  updateCard(bank);
  updateCard(player);
}

function draw() {
  play(player);
}

function endTurn() {
  while (bank.level <= MAX_BANK_CARD_VALUE) {
    play(bank);
  }
  endGame();
  result();
}

function endGame() {
  const app = document.querySelector(".app");
  if (player.money <= 0) {
    app.innerHTML = "<h1>Vous avez perdu 😣</h1>";
    app.style.backgroundColor = "#ff0000";
    app.style.width = "100%";
    app.style.height = "100%";
  }
  if (player.money > 0 && bank.money <= 0) {
    app.innerHTML = "<h1>Vous avez gagné  💪</h1>";
    app.backgroundColor = "#00ff00";
    app.style.width = "100%";
    app.style.height = "100%";
  }
}
function result() {
  if (bank.level > BLACKJACK && player.level <= BLACKJACK) {
    genResultSentence(true);
    player.money += game.bankBet + game.playerBet;
    bank.money -= game.bankBet + game.playerBet;
  } else if (player.level >= bank.level && player.level <= BLACKJACK) {
    player.money += game.bankBet + game.playerBet;
    bank.money -= game.bankBet + game.playerBet;
    genResultSentence(true);
  } else {
    bank.money += game.bankBet + game.playerBet;
    player.money -= game.bankBet + game.playerBet;
    genResultSentence(false);
  }
  const finalScore = document.createElement("p");
  finalScore.textContent = `Player - ${player.level} - Bank: ${bank.level}.`;

  const result = document.querySelector(".result");
  result.appendChild(finalScore);

  const restart = document.createElement("button");
  restart.id = "restart";
  restart.textContent = "Recommencer";
  restart.addEventListener("click", init);
  result.appendChild(restart);

  result.style.display = "";
  document.querySelector("#play").removeEventListener("click", draw);
  document.querySelector("#end").removeEventListener("click", endTurn);
}

function genResultSentence(isWin) {
  const child = document.createElement("h1");
  const res = document.querySelector(".result");
  if (isWin) {
    child.textContent = "Tu as gagné 🎉";
    res.style.backgroundColor = "#00ff00";
  } else {
    child.textContent = "Tu as perdu ! 😭";
    res.style.backgroundColor = "#ff0000";
  }
  res.appendChild(child);
}

function updateCard(player) {
  document.getElementById(`${player.name}Card`).innerHTML = "";
  player.cards.forEach((card) => {
    const img = document.createElement("img");
    img.src = `./PNG/${card.imgName}.png`;
    document.getElementById(`${player.name}Card`).appendChild(img);
  });
}

init();
