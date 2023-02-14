function fetchData() {
  fetch('https://iss.moex.com/iss/engines/stock/markets/bonds/boards/TQCB/securities.json')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      document.getElementById('console').textContent = JSON.stringify(data, null, 2);
    })
    .catch(error => console.error(error));
}
