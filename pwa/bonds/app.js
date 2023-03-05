const bondDataUrl = 'https://iss.moex.com/iss/engines/stock/markets/bonds/boards/tqcb/securities.json';

fetch(bondDataUrl)
  .then(response => response.json())
  .then(data => {
    const bondData = data.marketdata.data;
    const bondDataHtml = bondData.map(bond => {
      return `<div>
                <h2>${bond[2]}</h2>
                <p>Price: ${bond[7]}</p>
                <p>Yield: ${bond[12]}</p>
              </div>`;
    }).join('');
    document.getElementById('bond-data').innerHTML = bondDataHtml;
  })
  .catch(error => console.error(error));
