import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getDataFromApi } from "../../services/getDataFromApi";
import BasicColumnAverageSpendChart from "../Graphics/touristSpending/BasicColumnAverageSpendChart";
import BasicColumnSpendChart from "../Graphics/touristSpending/BasicColumnSpendChart";
import LineChart from "../Graphics/touristSpending/LineChart";

function TouristSpendingGraph() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getDataFromApi("/api/v1/touristSpending").then(setData).catch(console.log);
  }, []);

  return (
    <div>
      <Container className="mt-4 graph-container text-style">
        <h2 className="section-title">Visualización de los datos</h2>
        <Container>
          <LineChart data={[...data]} />
          <BasicColumnAverageSpendChart data={[...data]} />
          <BasicColumnSpendChart data={[...data]} />
        </Container>
      </Container>
    </div>
  );
}

export default TouristSpendingGraph;
