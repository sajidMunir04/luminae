import { Db, MongoClient, ObjectId } from 'mongodb';
import { Product } from '../../src/app/utils/Product';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  const productPage = req.body;
  const requiedProductId = new mongoose.Types.ObjectId(productPage)._id;
  const client : MongoClient = new MongoClient(process.env.MONGODB_URI as string);
  console.log(req.body);
  try {
    await client.connect();
    const db : Db = client.db('Products');
    const collection = db.collection('products');
    const data = await collection.findOne({ _id : requiedProductId});
    res.status(200).json(data);
    await client.close();
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ message: 'Error fetching data', error });
  } finally {
    //
  }
}