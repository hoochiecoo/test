function search() {
  const searchInput = document.getElementById('search');
  const table = document.getElementById('data');
  const rows = table.getElementsByTagName('tr');
  const searchText = searchInput.value.toLowerCase();
  for (let i = 1; i < rows.length; i++) {
    let rowText = '';
    const cells = rows[i].getElementsByTagName('td');
    for (let j = 0; j < cells.length; j++) {
      rowText += cells[j].textContent.toLowerCase() + ' ';
    }
    if (rowText.indexOf(searchText) === -1) {
      rows[i].style.display = 'none';
    } else {
      rows[i].style.display = '';
    }
  }
}

function populateTable(data) {
  const table = document.getElementById('data');
  for (let i = 0; i < data.length; i++) {
    const row = table.insertRow(-1);
    for (let key in data[i]) {
      const cell = row.insertCell(-1);
      cell.textContent = data[i][key];
    }
  }
}

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (this.readyState === 4 && this.status === 200) {
    const response = xhr.responseXML;
    const securities = response.getElementsByTagName('row');
    const data = [];
    for (let i = 0; i < securities.length; i++) {
      const row = securities[i];
      const secid = row.getAttribute('SECID');
      const shortname = row.getAttribute('SHORTNAME');
      const prevadmittedquote = row.getAttribute('PREVADMITTEDQUOTE');
      const facevalue = row.getAttribute('FACEVALUE');
      const accruedint = row.getAttribute('ACCRUEDINT');
      const nextcoupon = row.getAttribute('NEXTCOUPON');
      const couponvalue = row.getAttribute('COUPONVALUE');
      const couponperiod = row.getAttribute('COUPONPERIOD');
      const listlevel = row.getAttribute('LISTLEVEL');
      const offerdate = row.getAttribute('OFFERDATE');
      const matdate = row.getAttribute('MATDATE');
      const status = row.getAttribute('STATUS');
      const couponpercent = row.getAttribute('COUPONPERCENT');
      const buybackprice = row.getAttribute('BUYBACKPRICE.BUYBACKPRICE');
      const buybackdate = row.getAttribute('BUYBACKPRICE.BUYBACKDATE');

      data.push({
        SECID: secid,
        SHORTNAME: shortname,
        PREVADMITTEDQUOTE: prevadmittedquote,
        FACEVALUE: facevalue,
        ACCRUEDINT: accruedint,
        NEXTCOUPON: nextcoupon,
        COUPONVALUE: couponvalue,
        COUPONPERIOD: couponperiod,
        LISTLEVEL: listlevel,
        OFFERDATE: offerdate,
        MATDATE: matdate,
        STATUS: status,
        COUPONPERCENT: couponpercent,
        BUYBACKPRICE: buybackprice,
        BUYBACKDATE: buybackdate
      });
    }
    populateTable(data);
  }
};
xhr.open('GET', 'https://iss.moex.com/iss/engines/stock/markets/bonds/boards/TQOB/securities.xml?iss.meta=off&iss.only=securities&securities.columns=SECID,SHORTNAME,PREVADMITTEDQUOTE,FACEVALUE,ACCRUEDINT,NEXTCOUPON,COUPONVALUE,COUPONPERIOD,LISTLEVEL,OFFERDATE,MATDATE,STATUS,COUPONPERCENT,BUYBACKPRICE.BUYBACKDATE');
xhr.send();
