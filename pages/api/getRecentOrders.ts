import { Db, MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const client: MongoClient = new MongoClient(process.env.MONGODB_URI as string);
  try {
    await client.connect();
    const db: Db = client.db('Orders');
    const collection = db.collection('pendingOrders');
    const data = await collection.aggregate([{$sample: {
      size: 10
    }}]).toArray();
    res.status(200).json({"orders":data});
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ message: 'Error fetching data', error });
  } finally {
    await client.close();
  }
}