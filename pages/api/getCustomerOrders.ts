import { OrderedProduct } from '@/app/cart/OrderedProduct';
import { Db, MongoClient, ObjectId, WithId } from 'mongodb';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  console.log(req.body);
  const userId = req.body;
  const client : MongoClient = new MongoClient(process.env.MONGODB_URI as string);
  try {
    await client.connect();
    const db : Db = client.db('Orders');
    const pendingOrdersCollection = db.collection('pendingOrders');
    const results = await pendingOrdersCollection.find({'userId': userId});
    await results;
    res.status(200).json({"data": results});
    await client.close();
  } catch (error) {
    res.status(500).send(error);
  } finally {
    //
  }
}