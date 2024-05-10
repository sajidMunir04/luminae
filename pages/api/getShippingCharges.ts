

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const { totalPrice } = req.body;
  const amount : number = parseFloat(totalPrice);
  const shippingCharges = amount * 0.05;
  res.status(200).json(shippingCharges);
}

