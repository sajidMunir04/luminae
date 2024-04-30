import { Db, MongoClient } from 'mongodb';
import { Product } from '../../../src/app/utils/Product';

export default async function handler(req, res) {
  const { slug } = req.query;
  const [productsId] = slug;
  const allProductsId : string[] = productsId.split(',');
  console.log(allProductsId);
  const client : MongoClient = new MongoClient(process.env.MONGODB_URI as string);
  try {
    await client.connect();
    const db : Db = client.db('Products');
    const collection = db.collection('products');
    const documents : Document[] = [];
    allProductsId.map((prodId) => {const data = collection.aggregate(
      [ 
        { $match : { '_id' : prodId } }
      ]
    );
    documents.push(data.toArray()[0]);
  });
    res.status(200).json(documents);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ message: 'Error fetching data', error });
  } finally {
    await client.close();
  }
}