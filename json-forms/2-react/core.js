// Define Core component
function Core() {
    return React.createElement('div', null, 'Hello, Core');
}

// Render the Core component into the 'core' container
ReactDOM.render(
    React.createElement(Core),
    document.getElementById('core')
);
