let securitiesData;

function fetchData() {
  fetch('https://iss.moex.com/iss/engines/stock/markets/bonds/boards/TQCB/securities.json')
    .then(response => response.json())
    .then(data => {
      securitiesData = data;
      console.log(securitiesData);
    })
    .catch(error => console.error(error));
}

function showMetadata() {
  const metadataList = document.createElement('ul');
  if (securitiesData && securitiesData.securities && securitiesData.securities.metadata) {
    securitiesData.securities.metadata.forEach(item => {
      const metadataItem = document.createElement('li');
      metadataItem.textContent = `${item.name}: ${item.value}`;
      metadataList.appendChild(metadataItem);
    });
  } else {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Metadata not found.';
    metadataList.appendChild(errorMessage);
  }
  document.getElementById('console').appendChild(metadataList);
}
