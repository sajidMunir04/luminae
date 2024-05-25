import { OrderFormData } from "@/app/cart/OrderFormData";
import { Db, MongoClient } from "mongodb";
import { NextApiRequest } from "next";
import {Order} from "@/model/orderModel.mjs";


export default async function handler(req : NextApiRequest,res) {
    const data : OrderFormData = JSON.parse(req.body);
    const client : MongoClient = new MongoClient(process.env.MONGODB_URI as string);
  try {
    await client.connect();
    const db : Db = client.db('Orders');
    const collection = db.collection('pendingOrders');
    const result = (await collection.insertOne(data)).insertedId;
    res.status(200).json(result);
    await client.close();
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ message: 'Error fetching data', error });
  } finally {
    //
  }
}