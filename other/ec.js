console.log("KEKS")
function calculateTotalButtons() {
  const buttons = document.querySelectorAll('button'); // Select all button elements
  return buttons.length; // Return the total number of buttons
}

// Output the total number of buttons to the console
console.log('Total number of buttons:', calculateTotalButtons());
