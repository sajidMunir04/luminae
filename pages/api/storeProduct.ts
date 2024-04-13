import { MongoClient } from "mongodb";

export default async function handler(req,res) {

    const {method, body} = req;
    const {data} = body;
    const client = new MongoClient(process.env.MONGODB_URI as string);
    try {
        await client.connect();
        const db = client.db('Products');
        const collection = db.collection('products');
        const result =  await collection.insertOne(data);
    } catch (error) {
        
    }
    finally{
        client.close();
    }
}
