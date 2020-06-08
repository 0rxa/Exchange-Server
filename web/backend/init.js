require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;

const { DB_HOST, DB_USER, DB_PASS } = process.env;
const dbName = 'exchange';
const url = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:27017/?authMechanism=DEFAULT`;
const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});

const pair = [
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
const key = [
	"USD",
	"EUR",
	"AUD",
	"CAD",
	"CHF",
	"DKK",
	"GBP",
	"JPY",
	"NOK",
	"SEK"
]

client.connect( async (err) => {
	console.log("Connected successfully to server");

	const db = client.db(dbName);
	db.listCollections().toArray( async (err, collInfos) => {
		colls = collInfos.map(coll => coll.name);
		if(colls.includes('pair')) {
			await db.collection('pair').drop((err, delOK) => {
				if(err) throw err;
				else console.log("Collection deleted");
			});
		}
		insertDocuments(db, 'pair', pair, (result) => console.log(result));
	});
});


const insertDocuments = function(db, collectionName, data, callback) {
  const collection = db.collection(collectionName);
  collection.insertMany(data, function(err, result) {
    callback(result);
  });
}
