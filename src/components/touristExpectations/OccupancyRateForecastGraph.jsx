import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getDataFromApi } from "../../services/getDataFromApi";

function OccupancyRateForecastGraph() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getDataFromApi("/api/v1/occupancyRateForecast")
      .then(setData)
      .catch(console.log);
  }, []);

  return (
    <div>
      <Container className="mt-4 graph-container">
        <h2 className="section-title">Visualización de los datos</h2>
        <Container></Container>
      </Container>
    </div>
  );
}

export default OccupancyRateForecastGraph;
