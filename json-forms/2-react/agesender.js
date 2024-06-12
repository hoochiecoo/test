// Define AgeSender component
class AgeSender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            age: '' // Track age input
        };
    }

    // Method to handle input change for age
    handleAgeChange = (event) => {
        this.setState({
            age: event.target.value,
        });
    };

    // Method to handle form submission
    handleSubmit = (event) => {
        event.preventDefault();
        const { age } = this.state;
        // Fetch URL with age as URL-encoded parameter
        fetch(`your_api_url?age=${encodeURIComponent(age)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            // You can add other options like body if needed
        })
            .then(response => {
                // Handle response
            })
            .catch(error => {
                // Handle error
            });
    };

    render() {
        return (
            <form className="age-sender" onSubmit={this.handleSubmit}>
                <input type="number" placeholder="Age" value={this.state.age} onChange={this.handleAgeChange} className="age-input" />
                <button type="submit" className="send-button">Send</button>
            </form>
        );
    }
}

// Render the AgeSender component into the 'core' container
ReactDOM.render(
    <AgeSender />,
    document.getElementById('core')
);
