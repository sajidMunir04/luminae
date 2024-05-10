export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store');
    const { totalPrice } = req.body;
    const amount : number = parseFloat(totalPrice);
    const tax = amount * 0.2;
    res.status(200).json(tax);
  }
  
  