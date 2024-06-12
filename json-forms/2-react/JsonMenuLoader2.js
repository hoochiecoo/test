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
                const paths = extractPaths(data);
                renderLinks(paths);
            })
            .catch(error => console.error('Error fetching JSON:', error));
    }

    // Function to extract paths from JSON response
    function extractPaths(data) {
        if (!Array.isArray(data) || data.length === 0) return [];
        const paths = [];
        data.forEach(item => {
            if (item.type === 'file') {
                paths.push(item.path);
            }
        });
        return paths;
    }

    // Function to replace parts of the query parameter values in links
    function replaceQueryParams(paths, names) {
        return paths.map((path, index) => {
            const name = names[index];
            const newPath = path.replace(/<param>/, name);
            return newPath;
        });
    }

    // Function to render links
    function renderLinks(paths) {
        const names = ["name1", "name2", "name3"]; // Placeholder names, replace with actual names obtained from response
        const replacedPaths = replaceQueryParams(paths, names);
        const links = replacedPaths.map((path, index) =>
            React.createElement('div', { key: index }, 
                React.createElement('a', { href: `https://github.com/hoochiecoo/test/tree/main/json-forms/2-react/${path}`, target: '_blank' }, path)
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
    document.getElementById('JsonMenuLoader2')
);
