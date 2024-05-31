import { Db, MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { slug } = req.query;
  const productId  = slug;
  const client : MongoClient = new MongoClient(process.env.MONGODB_URI as string);
  try {
    await client.connect();
    const db : Db = await client.db('Reviews');
    const collection = await db.collection('productReviews');
    const data = await collection.find({ 'productId' : productId}).toArray();
    res.status(200).json({'data': data});
  } catch (error) {
    res.status(500).json({ message: error });
  } finally {
    await client.close();
  }
}