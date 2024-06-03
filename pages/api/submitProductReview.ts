import { ProductReviewData } from '@/app/products/ProductReviewData';
import { Db, MongoClient } from 'mongodb';
import {ProductReview} from "../../src/model/ProductReview.mjs"

export default async function handler(req, res) {
  const productReview: ProductReviewData = await JSON.parse(req.body);
  const client : MongoClient = new MongoClient(process.env.MONGODB_URI as string);
  try {
    await client.connect();
    const db : Db = client.db('Reviews');
    const collection = db.collection('productReviews');

    const reviewData = new ProductReview({
      headingText: productReview.reviewHeading,
      reviewText: productReview.reviewDetail,
      reviewLikes: productReview.reviewLikes,
      reviewDislikes: productReview.reviewDislikes,
      reviewerName: productReview.reviewerName,
      rating: productReview.rating,
      productId: productReview.productId
    })

    const data = await collection.insertOne(reviewData);
    res.status(200).json({"status": data});
    await client.close();
  } catch (error) {
    res.status(500).send(error);
  } finally {
    //
  }
}