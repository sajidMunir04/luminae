import { Db, MongoClient } from 'mongodb';
import { Product } from '../../../src/app/utils/Product';

export default async function handler(req, res) {
  const { slug } = req.query;
  const [product, productCategory] = slug;
  const client : MongoClient = new MongoClient(process.env.MONGODB_URI as string);
  try {
    await client.connect();
    const db : Db = client.db('Products');
    const collection = db.collection('products');
    const data = await collection.aggregate(
      [ 
        { $match : { 'section' : product,  'category' : productCategory } }
      ]
    ).toArray();
    res.status(200).json({'data': data});
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ message: 'Error fetching data', error });
  } finally {
    await client.close();
  }
}