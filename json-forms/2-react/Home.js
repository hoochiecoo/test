// Define Content component
function Content() {
    return React.createElement('div', null, 'Hello, Home');
}

// Render the Content component into the 'content' container
ReactDOM.render(
    React.createElement(Content),
    document.getElementById('content')
);