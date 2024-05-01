import { Db, MongoClient, ObjectId } from 'mongodb';
import { Product } from '../../../src/app/utils/Product';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  const { slug } = req.query;
  const [productsId] = slug;
  let allProductsId : ObjectId[] = productsId.split(',');
  allProductsId = allProductsId.map(function(el) { return  new mongoose.Types.ObjectId(el) })
  allProductsId.forEach((id) => id.toString().substring(4));
  console.log(allProductsId);
  const client : MongoClient = new MongoClient(process.env.MONGODB_URI as string);
  try {
    await client.connect();
    const db : Db = client.db('Products');
    const collection = db.collection('products');
    const data = collection.aggregate(
      [ 
        { '$match': { _id: { '$in': [allProductsId]} }}
      ]
    ).toArray();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ message: 'Error fetching data', error });
  } finally {
    await client.close();
  }
}