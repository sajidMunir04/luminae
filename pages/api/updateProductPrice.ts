import { Db, MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const productUpdate : Record<string,string | number> = await JSON.parse(req.body);
  const client : MongoClient = new MongoClient(process.env.MONGODB_URI as string);
  try {
    await client.connect();
    const db : Db = client.db('Products');
    const collection = db.collection('products');
    const data = await collection.updateOne(
      {_id: new ObjectId(productUpdate.productId)},
      {$set: {price: productUpdate.newPrice}});
    res.status(200).json({"data": data});
    await client.close();
  } catch (error) {
    res.status(500).send(error);
  } finally {
    //
  }
}