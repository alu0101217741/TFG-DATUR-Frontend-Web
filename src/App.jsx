import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home";
import TouristExpectations from "./components/pages/TouristExpectations";
import TouristNumber from "./components/pages/TouristNumber";
import TouristSpending from "./components/pages/TouristSpending";
import TouristStay from "./components/pages/TouristStay";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/numero-de-turistas" element={<TouristNumber />} />
          <Route path="/estancia-turistica" element={<TouristStay />} />
          <Route path="/gasto-turistico" element={<TouristSpending />} />
          <Route
            path="/expectativas-turisticas"
            element={<TouristExpectations />}
          />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
