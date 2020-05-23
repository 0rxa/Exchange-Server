style();

const url = 'ws://localhost:8080'
ws = new WebSocket(url);
ws.onmessage = (event) => {
	data = JSON.parse(event.data);
	if(data.currency === "all") updateAll(data.data);
	else update(data.currency, data.data);
	style();
};

function update(currency, data) {
	element = document.getElementById(currency);
	const { name, buy, sell } = data;
	row = convertToRow(name, buy, sell);
	element.innerHTML = row;
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
		<td><div class="${name} buy" onclick="makeEditable(this)">${buy}</div></td>
		<td><div class="${name} sell" onclick="makeEditable(this)">${sell}</div></td>
	</tr>`;
}

function makeEditable(element) {
	element.setAttribute("onkeyup", "send(this)");
	element.setAttribute("contenteditable", "true");
}

function send(element) {
	if(event.key !== "Enter") {
		return
	}

	element.setAttribute("contenteditable", "false");
	classes = element.getAttribute("class");
	currency = classes.split(" ")[0];
	buy = document.getElementsByClassName(`${currency} buy`)[0].textContent;
	sell = document.getElementsByClassName(`${currency} sell`)[0].textContent;
	ws.send(JSON.stringify({
		"name": currency,
		"buy": buy,
		"sell": sell
	}));
}
