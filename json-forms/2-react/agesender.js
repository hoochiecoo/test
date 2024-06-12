class AgeSender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            age: ''
        };
    }

    handleAgeChange = (event) => {
        this.setState({
            age: event.target.value,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { age } = this.state;
        fetch(`your_api_url?age=${encodeURIComponent(age)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then(response => {
            })
            .catch(error => {
            });
    };

    render() {
        return React.createElement('form', { onSubmit: this.handleSubmit },
            React.createElement('input', { type: 'number', placeholder: 'Age', value: this.state.age, onChange: this.handleAgeChange }),
            React.createElement('button', { type: 'submit' }, 'Send')
        );
    }
}

ReactDOM.render(
    React.createElement(AgeSender),
    document.getElementById('core')
);
