import { OrderedProduct } from '@/app/cart/OrderedProduct';
import { Db, MongoClient, ObjectId, WithId } from 'mongodb';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  const { slug } = req.query;
  console.log('Query is',req.query);
  const productsId = slug;
  let allProductsId : ObjectId[] = productsId.split(',');
  const filteredIds = allProductsId.filter((item) => item !== null);
  allProductsId = filteredIds;
  allProductsId = allProductsId.map((el) => {return new ObjectId(el)._id });
  const client : MongoClient = new MongoClient(process.env.MONGODB_URI as string);
  try {
    await client.connect();
    const db : Db = client.db('Orders');
    const collection = db.collection('pendingOrders');
    const data = await collection.aggregate([
      {
        $match: {
          _id: { $in: allProductsId }
        }
      }
    ]).toArray();
    res.status(200).json({'data': data});
    await client.close();
  } catch (error) {
    res.status(500).send(error);
  } finally {
    //
  }
}