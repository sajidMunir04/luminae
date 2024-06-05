import { Db, MongoClient, ObjectId, WithId } from 'mongodb';
import { Product } from '@/models/Product.mjs';
import { ProductToAdd } from '@/components/dashboard/AddProduct';

export default async function handler(req, res) {
  const product: ProductToAdd = await JSON.parse(req.body);
  const article = new Product({
    name: product.name,
    description: product.description,
    price: product.price,
    previousPrice: product.previousPrice,
    images: product.images,
    discount: product.discount,
    inventoryCount: product.inventoryCount,
    brandName: product.brandName,
    category: product.category,
    section: product.section,
    sizes: product.sizes,
    color: product.color,
    style: product.style,
    model: product.productModel 
});
  console.log(product);
  const client : MongoClient = new MongoClient(process.env.MONGODB_URI as string);
  try {
    await client.connect();
    const db : Db = client.db('Products');
    const collection = db.collection('products');
    const result = await collection.insertOne(article);
    res.status(200).json({"data": result});
  } catch (error) {
    res.status(500).send(error);
  } finally {
    //
  }
}