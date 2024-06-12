// Define JsonMenuLoader component
function JsonMenuLoader() {
    const jsonUrl = 'https://api.github.com/repos/hoochiecoo/test/contents/json-forms/2-react'; // GitHub API URL

    function handleLoad() {
        fetch(jsonUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.github.v3+json' // GitHub API version 3
            }
        })
            .then(response => response.json())
            .then(data => {
                const names = extractNames(data);
                renderLinks(names);
            })
            .catch(error => console.error('Error fetching JSON:', error));
    }

    // Function to extract names from JSON response
    function extractNames(data) {
        if (!Array.isArray(data) || data.length === 0) return [];
        const names = data.filter(item => item.type === 'file').map(item => item.name);
        return names;
    }

    // Function to render links
    function renderLinks(names) {
        const links = names.map((name, index) =>
            React.createElement('div', { key: index }, 
                React.createElement('a', { href: `${window.location.host}${window.location.pathname}?parts=${name.replace('.js', '')}`, target: '_blank' }, name)
            )
        );
        ReactDOM.render(React.createElement('div', null, links), document.getElementById('jsonLinks'));
    }

    return React.createElement('div', null,
        React.createElement('button', { onClick: handleLoad }, 'Load JSON'),
        React.createElement('div', { id: 'jsonLinks' })
    );
}

// Render the JsonMenuLoader component into the 'JsonMenuLoader' container
ReactDOM.render(
    React.createElement(JsonMenuLoader),
    document.getElementById('JsonMenuLoader3')
);
