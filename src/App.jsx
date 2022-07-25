import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home";
import TouristExpectations from "./components/pages/TouristExpectations";
import TouristNumberAndNationalities from "./components/pages/TouristNumberAndNationalities";
import TouristSpending from "./components/pages/TouristSpending";
import TouristStay from "./components/pages/TouristStay";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route
            path="/numero-de-turistas-y-nacionalidades"
            element={<TouristNumberAndNationalities />}
          />
          <Route path="/estancia-turistica" element={<TouristStay />} />
          <Route path="/gasto-turistico" element={<TouristSpending />} />
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
