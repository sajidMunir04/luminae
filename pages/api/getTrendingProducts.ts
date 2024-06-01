import { Db, MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const client : MongoClient = new MongoClient(process.env.MONGODB_URI as string);
  try {
    await client.connect();
    const db : Db = client.db('Products');
    const collection = db.collection('products');
    const data = await collection.aggregate([{$sample: {
        size: 3
      }}, {$group: {
        _id: "$_id",
        result: { $push : "$$ROOT"}
      }}, {$replaceRoot: {
        newRoot: {$first : "$result" }
      }}]).toArray();
    res.status(200).json(data);
    await client.close();
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ message: 'Error fetching data', error });
  } finally {
    //
  }
}