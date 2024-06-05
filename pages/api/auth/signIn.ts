import { Db, MongoClient } from 'mongodb';
import { SignInCredentials } from '@/components/lib/definitions';

export default async function handler(req , res) {	
	const client : MongoClient = new MongoClient(process.env.MONGODB_URI as string);
	await client.connect();
	console.log(req.body);
	const db : Db = await client.db('Users');
	const collection = await db.collection('users');
	const userData: SignInCredentials = await req.body;
	console.log(userData);
	const data = await collection.findOne({'email' : userData.email});
	console.log(data,userData.email);
	const validPassword = data?.password === userData.password;

	if (!validPassword) {
		res.status(400).json({
			result: "Invalid password"
		});
	}
	else {
		res.status(200).json({result : "success"});	
	}
}

