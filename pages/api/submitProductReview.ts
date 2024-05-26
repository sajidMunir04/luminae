import { OrderedProduct } from '@/app/cart/OrderedProduct';
import { ProductReviewData } from '@/app/products/ProductReviewData';
import { Db, MongoClient, ObjectId, WithId } from 'mongodb';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  console.log(req.body);
  const productReview: ProductReviewData = await JSON.parse(req.body);
  const client : MongoClient = new MongoClient(process.env.MONGODB_URI as string);
  try {
    await client.connect();
    const db : Db = client.db('Products');
    const collection = db.collection('products');
    const data = await collection.findOne({_id : new ObjectId(productReview.productId)});
    const updatedData = [{
        headingText: productReview.reviewHeading,
        reviewText: productReview.reviewDetail,
        reviewLikes: 0,
        reviewDislikes: 0,
        reviewerName: productReview.reviewerName,
        rating: productReview.rating
    },...data?.reviews];
    await collection.updateOne({_id : new ObjectId(productReview.productId)},{$set: {reviews : updatedData}});
    res.status(200).json({"status": true});
    await client.close();
  } catch (error) {
    res.status(500).send(error);
  } finally {
    //
  }
}