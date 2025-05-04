# 📈 Live Stock Price Tracker (SSE)

This is a simple web application that shows **live stock prices** using **Server-Sent Events (SSE)** and real-time stock data fetched from external APIs (e.g., Twelve Data or Finnhub).

---

## 🚀 Features

- Real-time stock price updates (e.g., Apple Inc)
- Uses SSE (Server-Sent Events) for pushing data from backend to frontend
- Built using Node.js, Express, Axios, and vanilla HTML/CSS/JS
- API data source can be switched easily (e.g., from Twelve Data to Finnhub)
- Minimal, easy-to-understand project for learning SSE & real-time data fetching

---

## 🛠 Tech Stack

- **Frontend**: HTML, JavaScript
- **Backend**: Node.js, Express
- **API**: [Twelve Data API](https://twelvedata.com) or [Finnhub API](https://finnhub.io)

---

## 📂 Project Structure


├── server.js           # Express server (SSE + API fetch)
├── .env                # API keys and port config
├── public/
│   └── index.html      # Frontend HTML for displaying live prices
└── README.md


---

## ⚙️ Setup Instructions

### 1. Clone the repository
bash
git clone https://github.com/your-username/stock-price-sse.git
cd stock-price-sse

### 2. Install dependencies
bash
npm install

### 3. Set up `.env` file
Create a `.env` file at the root with the following content:

env
API_KEY=your_api_key_here
PORT=5000

> 🔑 You can get a free API key from:
> - [Twelve Data](https://twelvedata.com)
> - [Finnhub](https://finnhub.io)

### 4. Start the backend server
bash
node server.js


### 5. Open frontend
Use **Live Server** (VS Code extension) or any static file server to open `index.html`:
bash
# Using Python (optional)
cd public
python3 -m http.server 5500

Then open `http://localhost:5500` in your browser.

---

## 🧪 Testing SSE

If the real API doesn't provide frequent updates (e.g., free tier of Twelve Data), you can test with random mock data instead:

js
const price = (150 + Math.random() * 10).toFixed(2);
res.write(`data: ${JSON.stringify({ symbol: 'AAPL', price })}

`);


---

## 🔐 CORS Note

If you see a **CORS error**, make sure:
- The backend uses correct `cors()` settings.
- The frontend and backend run on the **same origin** (use `localhost` consistently).
- Example:
  js
app.use(cors({
  origin: 'http://localhost:5500',
  credentials: true
}));
  

---

## 📌 Use Cases

- Learning and demoing **Server-Sent Events**
- Building simple dashboards
- Real-time data stream visualization

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a PR.

---

## 📜 License

MIT License. See `LICENSE` file for details.
