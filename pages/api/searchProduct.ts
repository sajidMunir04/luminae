import { Db, MongoClient } from 'mongodb';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const search = req.body;
  console.log(search);
  const client : MongoClient = new MongoClient(process.env.MONGODB_URI as string);
  try {
    await client.connect();
    const db : Db = client.db('Products');
    const collection = db.collection('products');
    const data = await collection.find({'category' : search}).toArray();
    console.log("DATA",data);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ message: 'Error fetching data', error });
  } finally {
    await client.close();
  }
}

