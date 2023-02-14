function fetchData() {
  fetch('https://iss.moex.com/iss/engines/stock/markets/bonds/boards/TQCB/securities.json')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const metadataList = document.createElement('ul');
      data['securities']['metadata'].forEach(item => {
        const metadataItem = document.createElement('li');
        metadataItem.textContent = `${item.name}: ${item.value}`;
        metadataList.appendChild(metadataItem);
      });
      document.getElementById('console').appendChild(metadataList);
    })
    .catch(error => console.error(error));
}
