import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import Home from "./components/pages/Home";
import TouristExpectations from "./components/pages/TouristExpectations";
import TouristNumberAndNationalities from "./components/pages/TouristNumberAndNationalities";
import TouristSpending from "./components/pages/TouristSpending";
import TouristStay from "./components/pages/TouristStay";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route
            path="/tourist-number-and-nationalities"
            element={<TouristNumberAndNationalities />}
          />
          <Route path="/tourist-stay" element={<TouristStay />} />
          <Route path="/tourist-spending" element={<TouristSpending />} />
          <Route
            path="/tourist-expectations"
            element={<TouristExpectations />}
          />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
