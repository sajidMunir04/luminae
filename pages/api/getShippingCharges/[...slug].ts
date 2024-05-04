import { Db, MongoClient } from 'mongodb';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const { slug } = req.query;
  const [totalAmount] = slug;
  const amount : number = parseFloat(totalAmount);
  const shippingCharges = amount * 0.05;
  res.status(200).json(shippingCharges);
}

