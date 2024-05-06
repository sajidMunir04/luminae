import { Db, MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const { data } = req.body;
  const credentials : Partial<Record<"password" | "username", unknown>> = JSON.parse(data);
  console.log("Credentials",credentials);
  const client : MongoClient = new MongoClient(process.env.MONGODB_URI as string);
  try {
    await client.connect();
    const db : Db = client.db('Users');
    const collection = db.collection('users');
    const data = await collection.findOne({ 'email' : credentials.username});
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).return(null);
  } finally {
    await client.close();
  }

  return null;
}

