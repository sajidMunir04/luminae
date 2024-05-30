import { Db, MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {
  console.log('request body is',req.query);
  const productId  = req.query;
  const client : MongoClient = new MongoClient(process.env.MONGODB_URI as string);
  try {
    await client.connect();
    const db : Db = client.db('Reviews');
    const collection = db.collection('productReviews');
    const data = await collection.find({ _id : new ObjectId(productId)}).toArray();
    res.status(200).json({'data': data});
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ message: 'Error fetching data', error });
  } finally {
    await client.close();
  }
}