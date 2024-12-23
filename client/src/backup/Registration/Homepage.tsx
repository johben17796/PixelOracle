
import React from "react";
import "./home.css";

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      {/* Header */}
      <header className="header">
        <div className="logo">LOGO</div>
        <nav className="nav">
          <a href="#option1">Option 1</a>
          <a href="#option2">Option 2</a>
          <a href="#option3">Option 3</a>
          <a href="#option4">Option 4</a>
          <a href="#option5">Option 5</a>
        </nav>
        <div className="search-login">
          <input type="text" placeholder="Search..." />
          <button>Search</button>
          </div>
          <div className="login">
          <a href="/Login">
          <button>Log-In</button>
 	</a>         
        </div>
      </header>

      {/* Hero Section */}
      <div className="hero-section">
        <p>Hero Section Placeholder</p>
      </div>

      {/* Game Cards */}
      <div className="cards-container">
        {Array.from({ length: 6 }).map((_, index) => (
          <div className="card" key={index}>
            <div className="image-placeholder">Image</div>
            <div className="card-content">
              <p className="publisher">Game Publisher</p>
              <h3 className="game-title">Game Title</h3>
              <p className="game-info">Game info pulled from API</p>
            </div>
            <div className="card-footer">
              <button>★</button>
              <button>Share</button>
              <button>⋯</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;