import { Db, MongoClient, ObjectId } from 'mongodb';
import { Product } from '../../../src/app/utils/Product';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  const { slug } = req.query;
  const productsId = slug;
  let allProductsId : ObjectId[] = productsId.split(',');
  const filteredIds = allProductsId.filter((item) => item !== null);
  allProductsId = filteredIds;
  allProductsId = allProductsId.map((el) => {return new mongoose.Types.ObjectId(el)._id });
  const client : MongoClient = new MongoClient(process.env.MONGODB_URI as string);
  try {
    await client.connect();
    const db : Db = client.db('Products');
    const collection = db.collection('products');
    const data = await collection.aggregate([
      { 
        $match: {
          _id: { $in: allProductsId }
        }
      }
    ]).toArray();
    res.status(200).json(data);
    await client.close();
  } catch (error) {
    res.status(500).send(error);
  } finally {
    //
  }
}