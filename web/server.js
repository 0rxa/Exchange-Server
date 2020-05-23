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

app.get('/', (req, res) => {
	query(db, COLLECTION, '', (result) => {
		result = result.map((row) => {
			delete row['_id']
			return row;
		});
		res.render('index.ejs', { rows: result });
	});
});

app.post('/update', (req, res) => {
	console.log(req.body);
	res.sendStatus(201);
});

wss.on('connection', async (ws) => {
	ws.on('message', (msg) => {
		let newValue = null;
		try{ 
			newValue = JSON.parse(msg);
		} catch {
			console.err('malformed json');
			return;
		}
		
		msg = JSON.parse(msg);

		query(db, COLLECTION, { name: msg.name }, (res) => {
			if(res) {
				db.collection(COLLECTION)
					.updateOne(res[0], { $set: msg }, (err, res) => {
						if(err) console.log(err);
						else ws.emit('datachange');
					});
			}
		});

	})

	ws.on('datachange', () => {
		query(db, COLLECTION, '', (res) => {
			res = res.map((row) => {
				delete row['_id']
				return row;
			});
			wss.broadcast({
				currency: "all",
				data: res
			});
		});
	});
})


wss.broadcast = (data) => {
	wss.clients.forEach((client) => {
		client.send(JSON.stringify(data));
	})
}

async function query(db, collection, query, callback){
	await db.collection(collection).find(query).toArray((err, res) => {
		if(err) console.log(err);
		else callback(res);
	});
}

function update(newValue, ws){
	let obj = data.find(obj => newValue.name === obj.name);
	let ix = data.indexOf(obj);
	if(ix === -1) {
		console.err('currency not found');
		return;
	};

	data[ix] = newValue;
	payload.data = newValue;
	payload.currency = newValue.name;

	ws.emit('datachange');
}

