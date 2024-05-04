export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store');
    const { slug } = req.query;
    const [totalAmount] = slug;
    const amount : number = parseFloat(totalAmount);
    const tax = amount * 0.2;
    res.status(200).json(tax);
  }
  
  