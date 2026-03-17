import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("technology");
  const [loading, setLoading] = useState(false);

  const fetchNews = () => {
    setLoading(true);
    fetch(`https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=in&max=10&apikey=fbc246883d96ffa161665f0a3ce95401`)
      .then(res => res.json())
      .then(data => {
        setArticles(data.articles);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchNews();
  }, [category]);

  return (
    <div className="container">
      <h1>📰 TechPulse Live News</h1>

      <div className="controls">
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="technology">Technology</option>
          <option value="world">World</option>
          <option value="nation">India</option>
          <option value="business">Business</option>
          <option value="health">Health</option>
        </select>

        <button onClick={fetchNews}>🔄 Refresh</button>
      </div>

      {loading ? (
        <p className="loading">Loading latest news...</p>
      ) : (
        articles.map((news, index) => (
          <div key={index} className="card">
            {news.image && <img src={news.image} alt="news" />}
            <div className="card-content">
              <h3>{news.title}</h3>
              <p>{news.description}</p>
              <a href={news.url} target="_blank">Read Full Article →</a>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default App;