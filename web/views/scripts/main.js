const url = 'localhost:8080'
ws = new WebSocket("ws://" + url);
ws.onmessage = (event) => {
	location.reload();
};

function makeEditable(element) {
	element.setAttribute("onkeydown", "send(event, this)");
	element.setAttribute("contenteditable", "true");
}

function send(evt, element) {
	if(evt.keyCode !== 13) { return false; }
	document.execCommand('insertHTML', false, '<br/>');
	element.setAttribute("contenteditable", "false");

	classes = element.getAttribute("class");
	currency = classes.split(" ")[0];
	buy = document.getElementsByClassName(`${currency} buy`)[0].textContent;
	sell = document.getElementsByClassName(`${currency} sell`)[0].textContent;
	let obj = {
		"name": currency,
		"buy": parseFloat(buy),
		"sell": parseFloat(sell)
	}

	let xhr = new XMLHttpRequest();
	xhr.open("POST", "http://" + url +'/update');
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify(obj));
}
