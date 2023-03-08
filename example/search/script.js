// Sample data
const cardData = [
  "The Shawshank Redemption",
  "The Godfather",
  "The Dark Knight",
  "The Godfather: Part II",
  "12 Angry Men",
  "Schindler's List",
  "The Lord of the Rings: The Return of the King",
  "Pulp Fiction",
  "Forrest Gump",
  "The Lord of the Rings: The Fellowship of the Ring",
  "Inception",
  "The Lord of the Rings: The Two Towers",
  "Star Wars: Episode V - The Empire Strikes Back",
  "The Matrix",
  "Goodfellas",
  "One Flew Over the Cuckoo's Nest",
  "Se7en",
  "Life is Beautiful",
  "Saving Private Ryan",
  "The Green Mile"
];

// DOM elements
const searchInput = document.getElementById("searchInput");
const cardContainer = document.getElementById("cardContainer");

// Function to create card HTML from text string
function createCardHTML(text) {
  return `
    <div class="card">
      <p>${text}</p>
    </div>
  `;
}

// Function to populate card container with cards
function populateCards() {
  cardContainer.innerHTML = "";
  cardData.forEach((text) => {
    const cardHTML = createCardHTML(text);
    cardContainer.insertAdjacentHTML("beforeend", cardHTML);
  });
}

// Function to filter cards by user input
function filterCards() {
  const searchText = searchInput.value.toLowerCase();
  const filteredData = cardData.filter((text) => text.toLowerCase().includes(searchText));
  cardContainer.innerHTML = "";
  filteredData.forEach((text) => {
    const cardHTML = createCardHTML(text);
    cardContainer.insertAdjacentHTML("beforeend", cardHTML);
  });
}

// Event listener for search input changes
searchInput.addEventListener("input", filterCards);

// Populate the cards on page load
populateCards();
