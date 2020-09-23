import createDeck from "./Card.js";

const MAX_BANK_CARD_VALUE = 17;
const MIN_ACE_VALUE = 1;
const MAX_ACE_VALUE = 11;
const ACE_SYMBOL = "A";
const BLACKJACK = 21;
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

let deck = [];

function init() {
  deck = createDeck();
  play(bank);

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
  result();
}

function result() {
  if (bank.level > BLACKJACK && player.level <= BLACKJACK) {
    win();
  } else if (player.level >= bank.level && player.level <= BLACKJACK) {
    win();
  } else {
    loose();
  }
}

function win() {
  document.body.innerHTML = `<h1 style="color=blue"class="win"> Tu as gagné</h1><p> Player - ${player.level} - Bank: ${bank.level}.</p>`;

  document.body.style.background = "#76d275";
}

function loose() {
  document.body.innerHTML = `<h1 style="color=black"> Tu as perdu</h1>Player - ${player.level} - Bank: ${bank.level}`;
  document.body.style.background = "#ff0000";
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
document.getElementById("play").addEventListener("click", draw);
document.getElementById("end").addEventListener("click", endTurn);
