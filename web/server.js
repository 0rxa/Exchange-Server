require('dotenv').config()
const fs = require('fs');
const express = require('express')
const http = require('http')
const ws = require('ws');
const ejs = require('ejs');

const MongoClient = require('mongodb').MongoClient;
const { PORT, DB_HOST, DB_USER, DB_PASS } = process.env;
const DB_NAME = 'exchange';
const COLLECTION = 'pair';
const dbConnectionURL = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:27017/`;
const dbClient = new MongoClient(dbConnectionURL, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express()
const server = http.createServer(app);
const wss = new ws.Server({ server });

let db;
dbClient.connect((err) => {
	db = dbClient.db(DB_NAME);
	server.listen(8080, () => {
		console.log(`listening on ${PORT}`);
	})
});


const options = {
	dotfiles: 'ignore',
	etag: false,
	extensions: [],
	index: false,
	maxAge: '12h',
	redirect: true,
	setHeaders: (res, path, stat) => {
		res.set('x-built-by', 'rxa')
	}
}
app.use(express.json());
app.use(express.static('./views/', options));
app.set('view engine', 'ejs');

app.get('/', (request, response) => {
	db.collection(COLLECTION).find('').toArray((error, result) => {
		if(error) response.sendStatus(500);
		response.render('index.ejs', { rows: result });
	});
});

app.post('/update', (request, response) => {
	let httpStatus = 204;
	db.collection(COLLECTION).updateOne({ "name": request.body.name }, { $set: request.body }, (err, res) => {
		const { nModified, n } = res.result;
		if(n === 0) {
			response.sendStatus(400);
		}
		else if(nModified === 0) {
			response.sendStatus(200);
		}
		else {
			db.collection(COLLECTION).find('').toArray((error, result) => {
				if(error) response.sendStatus(500);
				wss.clients.forEach((client) => {
					payload = JSON.stringify({
						currency: "all",
						rows: result
					});
					client.send(payload);
				});
				response.sendStatus(204);
			});
		}
	});
});
