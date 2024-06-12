// Define Calculator component
class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayValue: '0', // Initialize display value to '0'
            currentNumber: '', // Track the current number being entered
            operator: '', // Track the current operator
            previousValue: '', // Track the previous value for calculations
        };
    }

    // Method to handle number button clicks
    handleNumberClick = (num) => {
        const { displayValue, currentNumber } = this.state;
        // Concatenate the clicked number to the current number being entered
        const newNumber = currentNumber + num;
        // Update the display value to show the new number
        this.setState({
            displayValue: newNumber === '0' ? num : newNumber, // If the current number is '0', replace it with the clicked number
            currentNumber: newNumber, // Update the current number
        });
    };

    // Method to handle operator button clicks
    handleOperatorClick = (op) => {
        const { currentNumber } = this.state;
        // Save the current number as previous value and reset current number
        this.setState({
            operator: op, // Set the operator
            previousValue: currentNumber, // Save the current number as previous value
            currentNumber: '', // Reset current number
        });
    };

    // Method to handle equals button click
    handleEqualsClick = () => {
        const { previousValue, currentNumber, operator } = this.state;
        let result = 0;
        // Perform calculation based on the operator
        switch (operator) {
            case '+':
                result = parseFloat(previousValue) + parseFloat(currentNumber);
                break;
            case '-':
                result = parseFloat(previousValue) - parseFloat(currentNumber);
                break;
            case '*':
                result = parseFloat(previousValue) * parseFloat(currentNumber);
                break;
            case '/':
                result = parseFloat(previousValue) / parseFloat(currentNumber);
                break;
            default:
                result = currentNumber;
        }
        // Update the display with the result
        this.setState({
            displayValue: result.toString(),
            currentNumber: result.toString(),
            previousValue: '',
            operator: '',
        });
    };

    // Method to handle clear button click
    handleClearClick = () => {
        // Reset all state values
        this.setState({
            displayValue: '0',
            currentNumber: '',
            operator: '',
            previousValue: '',
        });
    };

    render() {
        const { displayValue } = this.state;

        return React.createElement('div', null,
            React.createElement('div', { className: 'display' }, displayValue),
            React.createElement('div', { className: 'buttons' },
                // Numbers
                [7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map(num => React.createElement('button', { key: num, onClick: () => this.handleNumberClick(num) }, num)),
                // Operators
                ['+', '-', '*', '/'].map(op => React.createElement('button', { key: op, onClick: () => this.handleOperatorClick(op) }, op)),
                // Equals and Clear
                React.createElement('button', { onClick: this.handleEqualsClick }, '='),
                React.createElement('button', { onClick: this.handleClearClick }, 'C')
            )
        );
    }
}

// Render the Calculator component into the 'core' container
ReactDOM.render(
    React.createElement(Calculator),
    document.getElementById('calculator')
);
