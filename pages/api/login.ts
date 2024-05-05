import { Db, MongoClient } from 'mongodb';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const { data } = req.body;
  const credentials : Partial<Record<"password" | "username", unknown>> = JSON.parse(data);
  const client : MongoClient = new MongoClient(process.env.MONGODB_URI as string);
  try {
    await client.connect();
    const db : Db = client.db('Users');
    const collection = db.collection('users');
    const data = await collection.aggregate(
        [ 
          { $match : { 'email' : credentials.username , 'password' : credentials.password } }
        ]
    ).toArray();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).send(null);
  } finally {
    await client.close();
  }

  return null;
}

