const express = require('express')
const http = require('http')
const ws = require('ws');

const app = express()
const server = http.createServer(app);
const wss = new ws.Server({ server });
const port = 8080;

const data = [
	{
		name: "USD",
		buy: 1.00,
		sell: 1.01
	},
	{
		name: "EUR",
		buy: 1.00,
		sell: 1.01
	},
	{
		name: "AUD",
		buy: 1.00,
		sell: 1.01
	},
	{
		name: "CAD",
		buy: 1.00,
		sell: 1.01
	},
	{
		name: "CHF",
		buy: 1.00,
		sell: 1.01
	},
	{
		name: "DKK",
		buy: 1.00,
		sell: 1.01
	},
	{
		name: "GBP",
		buy: 1.00,
		sell: 1.01
	},
	{
		name: "JPY",
		buy: 1.00,
		sell: 1.01
	},
	{
		name: "NOK",
		buy: 1.00,
		sell: 1.01
	},
	{
		name: "SEK",
		buy: 1.00,
		sell: 1.01
	}
]

const options = {
	dotfiles: 'ignore',
	etag: false,
	extensions: ['html'],
	index: false,
	maxAge: '12h',
	redirect: true,
	setHeaders: (res, path, stat) => {
		res.set('x-built-by', 'rxa')
	}
}

app.use(express.static('./static/', options));
app.get('/', (req, res) => {
	res.redirect('/index.html');
})

wss.on('connection', (ws) => {
	ws.send(JSON.stringify(data));

	ws.on('message', (msg) => {
		ws.send(msg);
		ws.emit('rcvmsg');
	})

	ws.on('rcvmsg', () => {
		console.log('recieved msg event');
	});
})

server.listen(8080, () => {
	console.log(`listening on ${port}`);
})
