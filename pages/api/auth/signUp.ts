import { Db, MongoClient } from 'mongodb';
import { SignUpCredentials } from '@/components/lib/definitions';

export default async function handler(req, res) {
    console.log(req);
  const body: SignUpCredentials = req.body;
  const client : MongoClient = new MongoClient(process.env.MONGODB_URI as string);
  await client.connect();
  const db : Db = client.db('Users');
  const collection = db.collection('users');
  const newUser = {
    email : body.email,
    name: body.name,
    password: body.password
  }
    const data = await collection.insertOne(newUser);

	if (data.acknowledged) {
		res.status(200).json({
			result : "success"
		}).end();
		return;
	}
	else {
		res.status(400).json({
			error: "Failed to create user"
		}).end();
	}
}

