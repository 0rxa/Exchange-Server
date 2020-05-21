const MongoClient = require('mongodb').MongoClient;

const user = 'root';
const password = '1234';
const authMechanism = 'DEFAULT';
const dbName = 'exchange';
const url = `mongodb://${user}:${password}@10.10.0.2:27017/?authMechanism=${authMechanism}`;
const client = new MongoClient(url, {useNewUrlParser: true});

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
