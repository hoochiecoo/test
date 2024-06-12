// Define RandomNum component
function RandomNum() {
    function handleClick() {
        const num = document.getElementById('num').value || 10;
        const min = document.getElementById('min').value || 1;
        const max = document.getElementById('max').value || 6;
        const col = document.getElementById('col').value || 1;
        const base = document.getElementById('base').value || 10;
        const format = document.getElementById('format').value || 'plain';
        
        const url = `https://www.random.org/integers/?num=${num}&min=${min}&max=${max}&col=${col}&base=${base}&format=${format}&rnd=new`;

        fetch(url)
            .then(response => response.text())
            .then(data => alert(data))
            .catch(error => console.error('Error fetching random numbers:', error));
    }

    return React.createElement('div', null, 
        React.createElement('label', { htmlFor: 'num' }, 'Number of random numbers: '),
        React.createElement('input', { id: 'num', type: 'number', defaultValue: 10 }),
        React.createElement('br'),
        React.createElement('label', { htmlFor: 'min' }, 'Minimum value: '),
        React.createElement('input', { id: 'min', type: 'number', defaultValue: 1 }),
        React.createElement('br'),
        React.createElement('label', { htmlFor: 'max' }, 'Maximum value: '),
        React.createElement('input', { id: 'max', type: 'number', defaultValue: 6 }),
        React.createElement('br'),
        React.createElement('label', { htmlFor: 'col' }, 'Number of columns: '),
        React.createElement('input', { id: 'col', type: 'number', defaultValue: 1 }),
        React.createElement('br'),
        React.createElement('label', { htmlFor: 'base' }, 'Base: '),
        React.createElement('input', { id: 'base', type: 'number', defaultValue: 10 }),
        React.createElement('br'),
        React.createElement('label', { htmlFor: 'format' }, 'Format: '),
        React.createElement('input', { id: 'format', type: 'text', defaultValue: 'plain' }),
        React.createElement('br'),
        React.createElement('button', { onClick: handleClick }, 'Get Random Numbers')
    );
}

// Render the RandomNum component into the 'randomnum' container
ReactDOM.render(
    React.createElement(RandomNum),
    document.getElementById('randomnuminputs')
);
