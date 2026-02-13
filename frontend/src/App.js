import { useState, useEffect } from "react";
import MapView from "./components/MapView";
import { getTrafficPrediction } from "./services/api";
import axios from "axios";
import "./App.css";

function App() {
  const [traffic, setTraffic] = useState(null);
  const [position, setPosition] = useState([28.61, 77.23]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [mode, setMode] = useState("live");
  const [customHour, setCustomHour] = useState(12);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handlePredict = async (lat, lon) => {
    const now = new Date();
    const hour = mode === "live" ? now.getHours() : parseInt(customHour);
    const day = now.getDay() || 7;
    const value = await getTrafficPrediction(hour, day, lat, lon);
    setTraffic(value);
  };

  const handleSearchChange = async (text) => {
    setQuery(text);

    if (text.length < 3) {
      setResults([]);
      return;
    }

    const res = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${text}`
    );

    setResults(res.data.slice(0, 5));
  };

  const selectLocation = (place) => {
    const lat = parseFloat(place.lat);
    const lon = parseFloat(place.lon);
    setPosition([lat, lon]);
    handlePredict(lat, lon);
    setResults([]);
    setQuery(place.display_name);
  };

  const handleSearchClick = () => {
    if (results.length > 0) selectLocation(results[0]);
  };

  return (
    <div className="app">
      <div className="topBarHeader">
        <h1 className="title">FluxLane</h1>

        <button
          className="themeToggle"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? "🌙" : "🌞"}
        </button>
      </div>

      <div className="controlPanel">
        <div className="searchBox">
          <input
            type="text"
            placeholder="Search city, road or area..."
            value={query}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <button onClick={handleSearchClick}>Search</button>

          {results.length > 0 && (
            <div className="dropdown">
              {results.map((place, index) => (
                <div
                  key={index}
                  onClick={() => selectLocation(place)}
                  className="dropdownItem"
                >
                  {place.display_name}
                </div>
              ))}
            </div>
          )}
        </div>

        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="live">Live</option>
          <option value="custom">Custom</option>
        </select>

        {mode === "custom" && (
          <input
            type="number"
            min="0"
            max="23"
            value={customHour}
            onChange={(e) => setCustomHour(e.target.value)}
          />
        )}

        {traffic !== null && (
          <div className="trafficTag">Traffic: {traffic}%</div>
        )}
      </div>

      <MapView traffic={traffic} position={position} theme={theme} />

      <div className="footerCredit">
        made with ❤️ by{" "}
        <a
          href="https://actualmayank.github.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="portfolioLink"
        >
          mayank
        </a>
      </div>
    </div>
  );
}

export default App;