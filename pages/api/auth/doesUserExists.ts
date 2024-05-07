import { Db, MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const { slug } = req.body;
  const [email] = slug;
  const client : MongoClient = new MongoClient(process.env.MONGODB_URI as string);
  try {
    await client.connect();
    const db : Db = client.db('Users');
    const collection = db.collection('users');
    const data = await collection.findOne({ 'email' : email});
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ message: 'Error fetching data', error });
  } finally {
    await client.close();
  }
}