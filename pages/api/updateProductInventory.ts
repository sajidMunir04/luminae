import { Db, MongoClient, ObjectId } from 'mongodb';
import { ProductInventoryUpdate } from '@/components/dashboard/InventoryUpdater';

export default async function handler(req, res) {
  const productInventory: ProductInventoryUpdate = await JSON.parse(req.body);
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