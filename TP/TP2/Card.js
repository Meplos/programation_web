const MAX_VALUE = 10;

const values = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

const colors = ["S", "D", "H", "C"];

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

function createDeck() {
  const cards = [];
  values.forEach((val) => {
    colors.forEach((color) => {
      const card = {
        value: val,
        color: color,
        imgName: val + color,
      };
      if (val !== "K" && val !== "Q" && val !== "J") {
        card.score = eval(val);
      } else {
        card.score = MAX_VALUE;
      }
      cards.push(card);
    });
  });
  console.log(cards.length);
  shuffle(cards);
  return cards;
}

export default createDeck;
