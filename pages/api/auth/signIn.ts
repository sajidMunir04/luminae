import { DatabaseUser } from 'lucia';
import { Db, MongoClient } from 'mongodb';
import { lucia } from '../../../lib/auth';
import { SignInCredentials } from '@/app/lib/definitions';

export default async function handler(req, res) {
	const body: SignInCredentials = req.body;
	const username = body?.email;
	const password = body?.password;
  
  const client : MongoClient = new MongoClient(process.env.MONGODB_URI as string);
  await client.connect();
  const db : Db = client.db('Products');
  const collection = db.collection('products');
  const data = await collection.findOne({ 'email' : username });
  const validPassword = data?.password === password;

	if (!validPassword) {
		res.status(400).json({
			error: "Invalid password"
		});
		return;
	}

	if (!data) {
		res.status(400).json({
			error: "User does not exists"
		});
		return;
	}

	const session = await lucia.createSession(data.id, {});
	res
		.appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize())
		.status(200)
		.end();
}

