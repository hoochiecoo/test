// Define UserName component
function UserName(props) {
    return React.createElement('span', null, 'Username: ' + props.name);
}

// Define Core component
function ElementCode() {
    return React.createElement('div', null, 
        React.createElement(UserName, { name: 'JohnDoe' }), // Change 'JohnDoe' to desired username
        'Hello, Core'
    );
}

// Render the Core component into the 'core' container
ReactDOM.render(
    React.createElement(UserName),
    document.getElementById('username')
);
