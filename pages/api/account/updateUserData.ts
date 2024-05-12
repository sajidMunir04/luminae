import { Db, MongoClient } from 'mongodb';

export default async function handler(req, res) {	
	const client : MongoClient = new MongoClient(process.env.MONGODB_URI as string);
	await client.connect();
    const { userId, userData } = req.body;
	console.log(req.body);
	const db : Db = await client.db('Users');
	const collection = await db.collection('users');

    try {
        await collection.updateOne({'_id' : userId},
            {
                $set: {email: userData.email}
            }
        );
        res.send(200).json({"updated": true});
    }
	catch {
		res.status(500).json({"updated": false});	
	}
}