// Generate array of 20 random film names
const cardData = [];
const filmNames = [
  {
    title: "The Godfather",
    year: 1972,
    boxOffice: 24698048
  },
  {
    title: "The Shawshank Redemption",
    year: 1994,
    boxOffice: 28826203
  },
  {
    title: "The Dark Knight",
    year: 2008,
    boxOffice: 535234033
  }
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
