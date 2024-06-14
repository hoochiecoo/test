// Define Core component
function Content2() {
    return React.createElement('div', null, 'Hello, Content2');
}

// Render the Core component into the 'core' container
ReactDOM.render(
    React.createElement(Content2),
    document.getElementById('content2')
);
