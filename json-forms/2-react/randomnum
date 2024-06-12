// Define RandomNum component
function RandomNum() {
    function handleClick() {
        fetch('https://www.random.org/integers/?num=10&min=1&max=6&col=1&base=10&format=plain&rnd=new')
            .then(response => response.text())
            .then(data => alert(data))
            .catch(error => console.error('Error fetching random numbers:', error));
    }

    return React.createElement('button', { onClick: handleClick }, 'Get Random Numbers');
}

// Render the RandomNum component into the 'randomnum' container
ReactDOM.render(
    React.createElement(RandomNum),
    document.getElementById('randomnum')
);
