import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import { Collection, MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URL as string);
await client.connect();

const db = client.db();
const User : Collection<UserDoc> = db.collection("Users") as Collection<UserDoc>;
const Session = db.collection("Sessions") as Collection<SessionDoc>;

export const adapter = new MongodbAdapter(Session,User);

interface UserDoc {
	_id: string;
}



interface SessionDoc {
	_id: string;
	expires_at: Date;
	user_id: string;
}
