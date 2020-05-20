const url = 'ws://localhost:8080'
ws = new WebSocket(url);
ws.onmessage = (event) => {
	data = JSON.parse(event.data);
	updateAll(data);
	style();
};

function updateAll(data) {
	parentElement = document.getElementsByTagName('tbody')[0];
	parentElement.innerHTML =`
		<tr id='head'>
			<th class="header">Currency</th>
			<th class="header">Buy</th>
			<th class="header">Sell</th>
		</tr>`
	for(currency of data){
		parentElement.innerHTML += `
		<tr class="currency" id="${currency.name}">
			<td><img src="/images/${currency.name}.png">${currency.name}</td>
			<td><div>${currency.buy}</div></td>
			<td><div>${currency.sell}</div></td>
		</tr>`;
	}
}

function style() {
	colored = true;
	for( row of document.getElementsByClassName("currency") ) {
	 	bcgr = colored ? null : "#ebe7e7";
	 	row.style.background = bcgr;
	 	colored=!colored;
	}
}
