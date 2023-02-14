
// Create an array of objects, where each object has two properties: 'name' and 'type'
const myArray = [
  { name: 'apple', type: 'fruit' },
  { name: 'banana', type: 'fruit' },
  { name: 'carrot', type: 'vegetable' }
];

const searchInput = document.getElementById('searchInput');
const cardContainer = document.getElementById('cardContainer');

function createCard(obj) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `<h2>${obj.name}</h2><p>Type: ${obj.type}</p>`;
  return card;
}

function renderCards() {
  const filteredArray = myArray.filter(obj => {
    const searchValue = searchInput.value.toLowerCase();
    return obj.name.toLowerCase().includes(searchValue) || obj.type.toLowerCase().includes(searchValue);
  });

  cardContainer.innerHTML = '';

  filteredArray.forEach(obj => {
    const card = createCard(obj);
    cardContainer.appendChild(card);
  });
}

searchInput.addEventListener('input', renderCards);

renderCards();


// Define a search function that takes two arguments: the array to search and the search object
function searchArray(arr, searchObj) {
  // Loop through each item in the array
  for (let i = 0; i < arr.length; i++) {
    let matchCount = 0;
    // Loop through each property in the search object
    for (let prop in searchObj) {
      // Check if the current item matches the search object on the current property
      if (arr[i][prop] === searchObj[prop]) {
        matchCount++;
      }
    }
    // If all properties in the search object matched, return the index of the item
    if (matchCount === Object.keys(searchObj).length) {
      return i;
    }
  }
  // If no match is found, return -1
  return -1;
}

// Test the search function with an example search object for the string 'banana' and type 'fruit'
const index = searchArray(myArray, { name: 'banana' });
console.log(index); // Output: 1

// Test the search function with an example search object for the type 'vegetable'
const index2 = searchArray(myArray, { type: 'vegetable' });
console.log(index2); // Output: 2

// Test the search function with an example search object that matches no items in the array
const index3 = searchArray(myArray, { name: 'pear' });
console.log(index3); // Output: -1
