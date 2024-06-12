// Define NumberInput component
function NumberInputField(props) {
    function handleChange(event) {
        const value = event.target.value;
        const isValidYear = value >= 1990 && value <= 2025;
        const inputField = event.target;

        if (!isValidYear) {
            inputField.style.borderColor = 'red';
            inputField.nextElementSibling.innerText = 'Please enter a year between 1990 and 2025.';
        } else {
            inputField.style.borderColor = ''; // Reset to default border color
            inputField.nextElementSibling.innerText = '';
        }
    }

    return (
        React.createElement('div', null,
            React.createElement('input', {
                type: 'number',
                onChange: handleChange,
                min: 1990,
                max: 2025,
                style: { borderColor: '' } // Initial/default border color
            }),
            React.createElement('p', { style: { color: 'red', margin: '0' } }) // Error message container
        )
    );
}

// Render the NumberInput component into the 'number-input' container
ReactDOM.render(
    React.createElement(NumberInputField),
    document.getElementById('NumberInputField2')
);
