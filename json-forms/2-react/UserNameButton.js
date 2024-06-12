// Define UserName component
function UserNameButton(props) {
    function handleClick() {
        alert(props.name);
    }

    return React.createElement('button', { onClick: handleClick }, 'Click me');
}

// Render the UserName component into the 'username' container with the desired username
ReactDOM.render(
    React.createElement(UserNameButton, { name: 'JohnDoe' }), // Change 'JohnDoe' to desired username
    document.getElementById('UserNameButton')
);
