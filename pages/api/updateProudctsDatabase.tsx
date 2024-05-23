import { ProductOrderDetail } from '@/app/cart/OrderFormData';
import { Db, MongoClient, ObjectId } from 'mongodb';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  console.log(req.body);
  const products: ProductOrderDetail[] = JSON.parse(req.body);
  let allProductsId : ObjectId[] = products.map((item) => item._id as unknown as ObjectId);
  const filteredIds = allProductsId.filter((item) => item !== null);
  allProductsId = filteredIds;
  allProductsId = allProductsId.map((el) => {return new mongoose.Types.ObjectId(el)._id });
  const client : MongoClient = new MongoClient(process.env.MONGODB_URI as string);
  try {
    await client.connect();
    const db : Db = client.db('Products');
    const collection = db.collection('products');
    allProductsId.map(async (prodId) => {
        const data = await collection.findOne({_id: prodId})
        collection.updateOne({_id : prodId._id},
          {
              quantity: data?.quantity -1,
              
          }
        )
    })
    res.status(200).json({"dataUpdated": true});
    await client.close();
  } catch (error) {
    res.status(500).send(error);
  } finally {
    //
  }
}