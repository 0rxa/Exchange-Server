require('dotenv').config()
const express = require('express')
const http = require('http')
const ws = require('ws');
const cors = require('cors');

const MongoClient = require('mongodb').MongoClient;
const { PORT, DB_HOST, DB_USER, DB_PASS } = process.env;
const DB_NAME = 'exchange';
const COLLECTION = 'pair';
const dbConnectionURL = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:27017/`;
const dbClient = new MongoClient(dbConnectionURL, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express()
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const wss = new ws.Server({ server });

let db;
dbClient.connect((err) => {
	db = dbClient.db(DB_NAME);
	server.listen(8080, () => {
		console.log(`listening on ${PORT}`);
	})
});

wss.on('connection', (ws) => {
    db.collection(COLLECTION).find('').toArray((err, res) => {
        if(err) {
            console.log(err);
            return;
        }

        res = res.map(obj => {
            delete obj._id;
            return obj;
        });
        payload = {
            currencies: "all",
            data: res
        };
        ws.send(JSON.stringify(payload));
    });
});

app.put('/update', (request, response) => {
	key = Object.keys(request.body)[1];
	db.collection(COLLECTION).findOneAndUpdate({"name": request.body.name},
		{$set: {[key]: request.body[key]}}, {returnOriginal: false}, (err, doc) => {
			if(doc.value === null) {
				response.sendStatus(400);
				// return next(new Error(err));
				return;
			}

			payload = JSON.stringify({
				"name": doc.value.name,
				[key]: doc.value[key]
			});
			wss.clients.forEach((client) => client.send(payload));
			response.sendStatus(204);
		});
});
