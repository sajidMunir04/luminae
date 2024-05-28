import { Db, MongoClient, ObjectId, WithId } from 'mongodb';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  console.log(req.body);
  const productId : string = await JSON.parse(req.body);
  const client : MongoClient = new MongoClient(process.env.MONGODB_URI as string);
  try {
    await client.connect();
    const db : Db = client.db('Products');
    const collection = db.collection('products');
    const data = await collection.deleteOne({_id : new ObjectId(productId)});
    res.status(200).json({"status": data.acknowledged});
    await client.close();
  } catch (error) {
    res.status(500).send(error);
  } finally {
    //
  }
}