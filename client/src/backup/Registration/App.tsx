/*import React from "react";
import HomePage from "./homePage";
import Login from "./Login";

const App: React.FC = () => {
  return (
    <div>
      <HomePage />
    </div>
  );
};

export default App;*/

/*import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./homePage";
import Login from "./Login";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;*/


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Profile from "./Profile";
import Lists from "./Lists";
import Login from "./Login";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Lists" element={<Lists />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;