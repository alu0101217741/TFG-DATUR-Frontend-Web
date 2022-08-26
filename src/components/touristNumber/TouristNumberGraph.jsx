import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getDataFromApi } from "../../services/getDataFromApi";
import BasicBar from "../Graphics/touristNumber/BasicBar";
import LineCharts from "../Graphics/touristNumber/LineCharts";
import StackedBarChart from "../Graphics/touristNumber/StackedBarChart";
import "./TouristNumberGraph.css";

function TouristNumberGraph() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getDataFromApi("/api/v1/touristsNumber").then(setData).catch(console.log);
  }, []);

  return (
    <div>
      <Container className="mt-4 graph-container">
        <h2 className="section-title">Visualización de los datos</h2>
        <Container>
          <LineCharts data={[...data]} />
          <StackedBarChart data={[...data]} />
          <BasicBar data={[...data]} />
        </Container>
      </Container>
    </div>
  );
}

export default TouristNumberGraph;
