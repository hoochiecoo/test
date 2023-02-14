const MOEX_API_ENDPOINT = "https://iss.moex.com/iss/engines/stock/markets/bonds/boards/TQCB/securities.json";

const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get('query');

fetch(MOEX_API_ENDPOINT)
  .then(response => response.json())
  .then(data => {
    const securities = data.securities.data;

    // Create a list of available keys from the metadata object
    const keys = Object.keys(securities.metadata).map(key => {
      return `<li>${key}</li>`;
    });

    // Add the keys to the list in the HTML
    document.getElementById('keys-list').innerHTML = keys.join('');

    // Filter the securities by the query parameter
    const filteredSecurities = securities.filter(security => {
      const name = security[2].toLowerCase();
      const ticker = security[3].toLowerCase();
      return name.includes(query) || ticker.includes(query);
    });

    // Create HTML elements for the filtered securities
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    filteredSecurities.forEach(security => {
      const name = security[2];
      const ticker = security[3];
      const price = security[7];
      const securityElement = document.createElement('div');
      securityElement.classList.add('security');
      securityElement.innerHTML = `
        <h3>${name}</h3>
        <p>Ticker: ${ticker}</p>
        <p>Price: ${price}</p>
      `;
      resultsContainer.appendChild(securityElement);
    });
  })
  .catch(error => console.error(error));
