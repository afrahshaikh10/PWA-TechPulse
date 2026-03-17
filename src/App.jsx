import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("technology");

  const API_KEY = "fbc246883d96ffa161665f0a3ce95401";

  const fetchNews = async (selectedCategory = category) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://gnews.io/api/v4/top-headlines?lang=en&country=in&topic=${selectedCategory}&max=10&apikey=${API_KEY}`
      );
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, [category]);

  const categories = [
    "technology",
    "world",
    "business",
    "sports",
    "health",
    "entertainment",
  ];

  return (
    <div className="container">
      <h1>📰 TechPulse Live News</h1>

      {/* Category Buttons */}
      <div className="category-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`cat-btn ${category === cat ? "active" : ""}`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <button onClick={() => fetchNews()} className="refresh-btn">
        🔄 Refresh News
      </button>

      {loading && <p className="loading">Loading latest news...</p>}

      <div className="news-grid">
        {articles.map((news, index) => (
          <div key={index} className="card">
            {news.image && (
              <img src={news.image} alt="news" className="news-img" />
            )}
            <h3>{news.title}</h3>
            <p>{news.description}</p>
            <a href={news.url} target="_blank" rel="noreferrer">
              Read Full Article →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;