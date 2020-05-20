const url = 'ws://localhost:8080'
ws = new WebSocket(url);
ws.onmessage = (event) => {
	data = JSON.parse(event.data);
	updateAll(data);
	style();
};

function update(currency, data) {
	element = document.getElementById(currency);
	const { name, buy, sell } = currency;
	row = convertToRow(name, buy, sell);
	currency.innerHTML = row;
}

function updateAll(data) {
	parentElement = document.getElementsByTagName('tbody')[0];
	parentElement.innerHTML =`
		<tr id='head'>
			<th class="header">Currency</th>
			<th class="header">Buy</th>
			<th class="header">Sell</th>
		</tr>`
	for(currency of data) {
		const { name, buy, sell } = currency;
		row = convertToRow(name, buy, sell);
		parentElement.innerHTML += row;
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

function convertToRow(name, buy, sell){
	return `
	<tr class="currency" id="${name}">
		<td><img src="/images/${name}.png">${name}</td>
		<td><div>${buy}</div></td>
		<td><div>${sell}</div></td>
	</tr>`;
}
