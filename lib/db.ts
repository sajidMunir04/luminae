import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import { Collection, Db, Document, MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);
await client.connect();

const db : Db = client.db('Users');
const Session = db.collection("Sessions") as Collection<SessionDoc>;

export const adapter = new MongodbAdapter(Session,db.collection("users"));

interface UserDoc {
	_id: string;
	name: string,
	email: string,
	password: string
}


interface SessionDoc {
	_id: string;
	expires_at: Date;
	user_id: string;
}
