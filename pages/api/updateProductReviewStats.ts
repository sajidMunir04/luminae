import { Db, MongoClient, ObjectId } from 'mongodb';


export default async function handler(req, res) {
  const updateData : Record< string, string | number> = await JSON.parse(req.body);
  const client : MongoClient = new MongoClient(process.env.MONGODB_URI as string);
  try {
    await client.connect();
    const db : Db = client.db('Reviews');
    const collection = db.collection('productReviews');
    const data = await collection.updateOne(
      {_id : new ObjectId(updateData.reviewId)},
      {$set: {reviewLikes: updateData.likes,reviewDislikes: updateData.dislikes}});
    res.status(200).json({"status": data});
    await client.close();
  } catch (error) {
    res.status(500).send(error);
  } finally {
    //
  }
}