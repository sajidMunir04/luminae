import { Db, MongoClient, ObjectId, WithId } from 'mongodb';
import { ProductInventoryUpdate } from '@/app/dashboard/InventoryUpdater';

export default async function handler(req, res) {
  console.log(req.body);
  const productInventory: ProductInventoryUpdate = await JSON.parse(req.body);
  console.log(productInventory);
  const client : MongoClient = new MongoClient(process.env.MONGODB_URI as string);
  try {
    await client.connect();
    const db : Db = client.db('Products');
    const collection = db.collection('products');
    const data = await collection.updateOne(
      {_id: new ObjectId(productInventory.productId)},
      {$set: {inventoryCount: productInventory.inventoryData}});
    res.status(200).json({"data": data});
    await client.close();
  } catch (error) {
    res.status(500).send(error);
  } finally {
    //
  }
}