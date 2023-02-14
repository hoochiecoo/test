// Generate array of 20 random film names
const cardData = [];
const filmNames = [
  "The Godfather",
  "The Shawshank Redemption",
  "The Dark Knight",
  "The Godfather: Part II",
  "12 Angry Men",
  "Schindler's List",
  "The Lord of the Rings: The Return of the King",
  "Pulp Fiction",
  "The Good, the Bad and the Ugly",
  "Forrest Gump",
  "Inception",
  "The Lord of the Rings: The Fellowship of the Ring",
  "Star Wars: Episode V - The Empire Strikes Back",
  "The Lord of the Rings: The Two Towers",
  "The Matrix",
  "Goodfellas",
  "One Flew Over the Cuckoo's Nest",
  "Seven Samurai",
  "Se7en",
  "City of God"
];

while (cardData.length < 3) {
  const randomIndex = Math.floor(Math.random() * filmNames.length);
  const randomFilm = filmNames[randomIndex];
  if (!cardData.includes(randomFilm)) {
    cardData.push(randomFilm);
  }
}


// Rest of the code remains the same
const searchInput = document.getElementById("searchInput");
const cardContainer = document.getElementById("cardContainer");

function createCardHTML(text) {
  return `
    <div class="card">
      <p>${text}</p>
    </div>
  `;
}

function populateCards() {
  cardContainer.innerHTML = "";
  cardData.forEach((film) => {
    const cardHTML = createCardHTML(film);
    cardContainer.insertAdjacentHTML("beforeend", cardHTML);
  });
}

function filterCards() {
  const searchText = searchInput.value.toLowerCase();
  const filteredData = cardData.filter((film) => {
    for (const key in film) {
      if (film.hasOwnProperty(key)) {
        const value = film[key];
        if (typeof value === 'string' && value.toLowerCase().includes(searchText)) {
          return true;
        } else if (typeof value === 'number' && value.toString().includes(searchText)) {
          return true;
        }
      }
    }
    return false;
  });
  cardContainer.innerHTML = "";
  filteredData.forEach((film) => {
    const cardHTML = createCardHTML(film);
    cardContainer.insertAdjacentHTML("beforeend", cardHTML);
  });
}


searchInput.addEventListener("input", filterCards);

populateCards();
