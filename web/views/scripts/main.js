const url = window.location.hostname + ":" + window.location.port;
const protocol = window.location.protocol;
document.execCommand('insertHTML', false, '<br/>');

elements = document.querySelectorAll('div.buy, div.sell');
elements.forEach((element) => {
	element.addEventListener('click', makeEditable);
	element.addEventListener('keydown', send);
});

function makeEditable() {
	this.setAttribute('contenteditable', 'true');
}

ws = new WebSocket("ws://" + url);
ws.onmessage = (event) => {
	let cell_data = JSON.parse(event.data);
	let key = Object.keys(cell_data)[1];
	let cell = document.getElementsByClassName(`${cell_data.name} ${key}`)[0];
	cell.textContent = cell_data[key];
};

function send(event) {
	if(event.keyCode !== 13) { return false; }
	this.setAttribute("contenteditable", "false");

	currency = this.getAttribute("class").split(" ")[0];
	direction = this.getAttribute("class").split(" ")[1];
	value = this.textContent;

	let obj = {
		"name": currency,
		[direction]: parseFloat(value)
	}

	let xhr = new XMLHttpRequest();
	xhr.open("POST", window.location.protocol + "//" + url +'/update');
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify(obj));
}
