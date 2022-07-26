import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getDataFromApi } from "../../services/getDataFromApi";
import BasicColumnAverageSpendChart from "../Graphics/touristSpending/BasicColumnAverageSpendChart";
import BasicColumnSpendChart from "../Graphics/touristSpending/BasicColumnSpendChart";
import BasicColumnTotalSpendChart from "../Graphics/touristSpending/BasicColumnTotalSpendChart";
import LineChart from "../Graphics/touristSpending/LineChart";

function TouristSpendingGraph() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getDataFromApi("/api/v1/touristSpending").then(setData).catch(console.log);
  }, []);

  return (
    <div>
      <Container className="mt-4 graph-container">
        <h2 className="section-title">Visualización de los datos</h2>
        <Container>
          <LineChart data={[...data]} />
          <Container className="mt-4">
            <h3>Gasto turístico en Canarias por trimestre</h3>
            <BasicColumnTotalSpendChart data={[...data]} />
            <BasicColumnAverageSpendChart data={[...data]} />
            <BasicColumnSpendChart data={[...data]} />
          </Container>
        </Container>
      </Container>
    </div>
  );
}

export default TouristSpendingGraph;
