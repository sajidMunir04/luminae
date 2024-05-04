import { Db, MongoClient } from 'mongodb';
import { Product } from '../../../src/app/utils/Product';

export default async function handler(req, res) {
  const { slug } = req.query;
  const [email] = slug;
  const client : MongoClient = new MongoClient(process.env.MONGODB_URI as string);
  try {
    await client.connect();
    const db : Db = client.db('users');
    const collection = db.collection('users');
    const data = await collection.aggregate(
      [ 
        { $match : { 'section' : email } }
      ]
    ).toArray();
    if (data.length > 0)
        res.status(200).json(true);
    else
        res.status(200).json(false);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ message: 'Error fetching data', error });
  } finally {
    await client.close();
  }
}