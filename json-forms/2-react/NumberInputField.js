// Define NumberInput component
function NumberInputField(props) {
    function handleChange(event) {
        const value = event.target.value;
        if (value >= 1990 && value <= 2025) {
            alert("Valid year: " + value);
        } else {
            alert("Please enter a year between 1990 and 2025.");
        }
    }

    return React.createElement('input', { type: 'number', onChange: handleChange, min: 1990, max: 2025 });
}

// Render the NumberInput component into the 'number-input' container
ReactDOM.render(
    React.createElement(NumberInputField),
    document.getElementById('NumberInputField')
);
