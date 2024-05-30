import { OrderedProduct } from '@/app/cart/OrderedProduct';
import { Db, MongoClient, ObjectId, WithId } from 'mongodb';
import { inventoryData } from '../../databaseutilities/producttypes.mjs';
import { Product } from '@/model/Product.mjs';
import { Product as StoreProduct} from '@/app/utils/Product';

export default async function handler(req, res) {
  console.log(req.body);
  const product: StoreProduct = await JSON.parse(req.body);
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
    const result = collection.insertOne(article);
    res.status(200).json({"data": result});
    await client.close();
  } catch (error) {
    res.status(500).send(error);
  } finally {
    //
  }
}