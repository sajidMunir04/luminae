import { Db, MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const search = req.body;
  console.log(search);
  const client : MongoClient = new MongoClient(process.env.MONGODB_URI as string);
  try {
    await client.connect();
    const db : Db = client.db('Products');
    const collection = db.collection('products');
    const regex = new RegExp(`${search}`,'i');
    const data = await collection.aggregate([{ 
      $match : {$or : [ {name: {$regex: regex}},{brandName: {$regex: regex}},{category: {$regex: regex}}]}},
      {$project: {
        _id: 1,
        name: 1,
        price : 1,
        images : { $slice: ["$images", 0, 1] },
        brandName: 1,
      }},
      {$limit : 8}]).toArray();
    res.status(200).json({"data": data});
    await client.close();
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ message: 'Error fetching data', error });
  } finally {
    //await client.close();
  }
}

