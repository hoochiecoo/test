// Define the deck of cards
const deck = [
  'A♥', '2♥', '3♥', '4♥', '5♥', '6♥', '7♥', '8♥', '9♥', '10♥', 'J♥', 'Q♥', 'K♥',
  'A♦', '2♦', '3♦', '4♦', '5♦', '6♦', '7♦', '8♦', '9♦', '10♦', 'J♦', 'Q♦', 'K♦',
  'A♠', '2♠', '3♠', '4♠', '5♠', '6♠', '7♠', '8♠', '9♠', '10♠', 'J♠', 'Q♠', 'K♠',
  'A♣', '2♣', '3♣', '4♣', '5♣', '6♣', '7♣', '8♣', '9♣', '10♣', 'J♣', 'Q♣', 'K♣'
];

// Shuffle the deck of cards
for (let i = deck.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [deck[i], deck[j]] = [deck[j], deck[i]];
}

// Create the tableau piles
const tableau = [];
for (let i = 0; i < 10; i++) {
  tableau.push([]);
  for (let j = 0; j < 5; j++) {
    const card = deck.pop();
    tableau[i].push(card);
  }
}

// Create the foundation piles
const foundation = [
  [], [], [], []
];

// Create the stock and waste piles
const stock = deck;
const waste = [];

// Render the game
const gameEl = document.getElementById('game');
gameEl.innerHTML = `
  <div id="tableau">
    ${tableau.map((pile, index) => `
      <div class="pile" id="tableau${index}">
        ${pile.map((card, index) => `
          <div class="card">${card}</div>
        `).join('')}
      </div>
    `).join('')}
  </div>
  <div id="foundation">
    ${foundation.map((pile, index) => `
      <div class="pile" id="foundation${index}">
        ${pile.map((card, index) => `
          <div class="card">${card}</div>
        `).join('')}
      </div>
    `).join('')}
  </div>
  <div id="stock">
    <div class="pile" id="stockPile">
      <div class="card">${stock[stock.length - 1]}</div>
    </div>
    <div class="pile" id="wastePile">
      ${waste.map((card, index) => `
        <div class="card">${card}</div>
      `).join('')}
    </div>
 
</div>
`;
// Add event listeners to the stock and waste piles
const stockPileEl = document.getElementById('stockPile');
const wastePileEl = document.getElementById('wastePile');
stockPileEl.addEventListener('click', () => {
if (stock.length > 0) {
const card = stock.pop();
waste.push(card);
render();
}
});
wastePileEl.addEventListener('click', () => {
if (waste.length > 0) {
const card = waste.pop();
stock.push(card);
render();
}
});

// Render the game
function render() {
gameEl.innerHTML = <div id="tableau"> ${tableau.map((pile, index) =>
<div class="pile" id="tableau${index}">
${pile.map((card, index) => <div class="card">${card}</div> ).join('')}
</div>
).join('')} </div> <div id="foundation"> ${foundation.map((pile, index) => <div class="pile" id="foundation${index}">
${pile.map((card, index) => <div class="card">${card}</div> ).join('')}
</div>
).join('')} </div> <div id="stock"> <div class="pile" id="stockPile"> <div class="card">${stock.length > 0 ? stock[stock.length - 1] : ''}</div> </div> <div class="pile" id="wastePile"> ${waste.map((card, index) => <div class="card">${card}</div>
).join('')} </div> </div> ;
}
render();
