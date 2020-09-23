import createDeck from "./Card.js";

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

  update();
}

function play() {
  const card = deck.pop();
  player.level += card.score;
  player.cards.push(card);
  update();
}
function update() {
  document.getElementById("playerMoney").innerHTML = player.money;
  document.getElementById("bankMoney").innerHTML = bank.money;
  document.getElementById("playerLevel").innerHTML = player.level;
  document.getElementById("bankLevel").innerHTML = bank.level;

  updateCard(bank);
  updateCard(player);
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
document.getElementById("play").addEventListener("click", play);
