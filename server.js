// const express = require('express');
// const dotenv = require('dotenv');
// dotenv.config();
// const app= express();
// const cors = require('cors');
// const axios = require('axios');


// const API_KEY=process.env.API_KEY;
// const SYMBOL='AAPL';



// app.use(cors());
// app.get('/stock',async (req,res)=>{
//     res.set('Content-Type', 'text/event-stream');
//     res.set('Cache-Control', 'no-cache');
//     res.set('Connection', 'keep-alive');
//     res.set('Access-Control-Allow-Origin', '*');
//     res.set('Access-Control-Allow-Credentials', true);

//     const stockUpdate= async()=>{
//         try{
//             const response= await axios.get(`https://api.twelvedata.com/price?symbol=${SYMBOL}&apikey=${API_KEY}`)
//             const data= response.data;
//             const price= data.price;
//             const symbol= data.symbol;
//             res.write(`data: ${JSON.stringify({price,symbol})}\n\n`);
//         }
//         catch(err){
//             console.log(err);
//         }

//     }
//     const intervalId = setInterval(stockUpdate, 2000);
//     stockUpdate();
//     req.on('close', () => {
//         clearInterval(intervalId);
//         res.end();
//     });

// })
// app.listen(process.env.PORT, () => {
//     console.log(`Server is running on port ${process.env.PORT}`);
// })

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY;
const SYMBOL = 'AAPL';

app.use(cors());

app.get('/stock', async (req, res) => {
  // Set SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Fetch stock price
  const fetchPrice = async () => {
    try {
      const response = await axios.get(`https://api.twelvedata.com/price?symbol=${SYMBOL}&apikey=${API_KEY}`);
      const data = response.data;

      // Guard in case of bad response
      if (data.status === "error" || !data.price) {
        res.write(`data: ${JSON.stringify({ error: "Invalid API response" })}\n\n`);
        return;
      }

      res.write(`data: ${JSON.stringify({ symbol: SYMBOL, price: data.price })}\n\n`);
    } catch (err) {
      console.error("API error:", err.message);
      res.write(`data: ${JSON.stringify({ error: "Failed to fetch data" })}\n\n`);
    }
  };

  // Send immediately and then repeat every 2s
  fetchPrice();
  const intervalId = setInterval(fetchPrice, 2000);

  // Stop interval on client disconnect
  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
    console.log('Client disconnected');
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
