import { Db, MongoClient } from 'mongodb';

export default async function handler(req, res) {	
	const client : MongoClient = new MongoClient(process.env.MONGODB_URI as string);
	await client.connect();
	const db : Db = await client.db('Users');
	const collection = await db.collection('users');
	const userId = await req.body;
	const data = await collection.findOne({'_id' : userId});
	res.status(200).send({'userData': data});
}
