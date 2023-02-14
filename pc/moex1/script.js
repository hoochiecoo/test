// MOEX API endpoint for bond securities data
const MOEX_API_ENDPOINT = "https://iss.moex.com/iss/engines/stock/markets/bonds/boards/TQCB/securities.json";

// Get the query parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get("query");

// Fetch the bond securities data from the MOEX API
fetch(MOEX_API_ENDPOINT)
  .then(response => response.json())
  .then(data => {
    // Filter the data by the query parameter
    const filteredData = data.securities.filter(security => {
      const securityName = security[2];
      return securityName.toLowerCase().includes(query.toLowerCase());
    });

    // Create HTML elements for each security and add them to the results container
    const resultsContainer = document.getElementById("results");
    filteredData.forEach(security => {
      const securityName = security[2];
      const securityTicker = security[0];
      const securityPrice = security[11];
      const securityHtml = `
        <div class="security">
          <h2>${securityName}</h2>
          <p>Ticker: ${securityTicker}</p>
          <p>Price: ${securityPrice}</p>
        </div>
      `;
      resultsContainer.innerHTML += securityHtml;
    });
  })
  .catch(error => console.error(error));
