// Define CsvLoader component
function CsvLoader() {
    const csvUrl = 'https://raw.githubusercontent.com/HenryJobst/bowling-py/main/bowling_data_5000.csv'; // Hardcoded CSV URL

    function handleLoad() {
        fetch(csvUrl)
            .then(response => response.text())
            .then(csv => {
                const lines = csv.split('\n');
                const tableRows = lines.map((line, index) => {
                    const columns = line.split(',');
                    const rowCells = columns.map((column, columnIndex) =>
                        React.createElement('td', { key: columnIndex }, column)
                    );
                    return React.createElement('tr', { key: index }, rowCells);
                });

                const table = React.createElement('table', null, tableRows);
                ReactDOM.render(table, document.getElementById('csvData'));
            })
            .catch(error => console.error('Error fetching CSV:', error));
    }

    return React.createElement('div', null,
        React.createElement('button', { onClick: handleLoad }, 'Load CSV'),
        React.createElement('div', { id: 'csvData' })
    );
}

// Render the CsvLoader component into the 'csvloader' container
ReactDOM.render(
    React.createElement(CsvLoader),
    document.getElementById('csvloader')
);
