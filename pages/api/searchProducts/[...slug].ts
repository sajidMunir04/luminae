import { Db, MongoClient } from 'mongodb';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const { slug } = req.query;
  const { query } = slug;
  const client : MongoClient = new MongoClient(process.env.MONGODB_URI as string);
  try {
    await client.connect();
    const db : Db = client.db('Products');
    const collection = db.collection('products');
    const data = await collection.aggregate(
      [
        {
          $addFields: {
            documentArray: { $objectToArray: "$$ROOT" }
          }
        },
        {
          $match: {
            $expr: {
              $gt: [
                { $size: {
                  $filter: {
                    input: "$documentArray",
                    cond: {
                      $regexMatch: { input: "$$this.v", regex: new RegExp(query,'i') }
                    }
                  }
                }},
                0
              ]
            }
          }
        },
        {
          $project: {
            documentArray: 0
          }
        }
      ]
    ).toArray();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ message: 'Error fetching data', error });
  } finally {
    await client.close();
  }
}

