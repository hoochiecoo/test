// content.js

// Function to calculate the total number of buttons on the page
function calculateTotalButtons() {
  const buttons = document.querySelectorAll('button'); // Select all button elements
  return buttons.length; // Return the total number of buttons
}

// Function to calculate the total price on the page
function calculateTotalPrice() {
  const priceElements = document.querySelectorAll('//*[@class="amount"]'); // Select all elements with class="amount"
  let totalPrice = 0;

  // Iterate over price elements and sum up the prices
  priceElements.forEach(element => {
    const priceText = element.innerText; // Get the inner text of the element
    const price = parseFloat(priceText); // Convert the price text to a float
    totalPrice += price; // Add the price to the total
  });

  return totalPrice; // Return the total price
}

// Output the total number of buttons and total price to the console
console.log('Total number of buttons:', calculateTotalButtons());
console.log('Total price:', calculateTotalPrice());
