import express from 'express';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Replace with your real NewsAPI key
const NEWS_API_KEY = '47e50da56c8e48f989e84f668279a0ae';

app.get('/', (req, res) => {
  res.render('index', { articles: null, error: null });
});

app.post('/search', async (req, res) => {
  const { query } = req.body;
  const targetUrl = `newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${NEWS_API_KEY}`;

  try {
    const response = await axios.get(`https://${targetUrl}`);
    res.render('index', { articles: response.data.articles, error: null });
  } catch (err) {
    console.error(err.message);
    res.render('index', { articles: null, error: 'Failed to fetch news. Please try again.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
