import { Db, MongoClient } from 'mongodb';
export default async function handler(req, res) {
    console.log('fetching product sections');
  const client: MongoClient = new MongoClient(process.env.MONGODB_URI as string);
  try {
    await client.connect();
    const db: Db = client.db('Products');
    const collection = db.collection('products');
    const cursor = collection.aggregate([
      {
        $project: {
          section: 1,
          category: 1
        }
      }
    ]);
    const data = await cursor.toArray(); // Convert cursor to array
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ message: 'Error fetching data', error });
  } finally {
    await client.close();
  }
}
