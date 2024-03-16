import axios from 'axios';
import Cors from 'cors';
import initMiddleware from '../../utils/init-middleware';

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ['POST'],
  })
);

export default async function handler(req, res) {
  // Run the middleware
  await cors(req, res);

  try {
    // Make the request to allaypay
    const response = await axios.post('https://allaypay.transactiongateway.com/api/transact.php', req.body);

    // Return the response from allaypay
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}