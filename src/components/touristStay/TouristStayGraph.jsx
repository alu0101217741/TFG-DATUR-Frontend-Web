import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getDataFromApi } from "../../services/getDataFromApi";
import ColumnComparisonChart from "../Graphics/touristStay/ColumnComparisonChart";
import ColumnDrilldown from "../Graphics/touristStay/ColumnDrilldown";
import LineChart from "../Graphics/touristStay/LineChart";

function TouristStayGraph() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getDataFromApi("/api/v1/touristStay").then(setData).catch(console.log);
  }, []);

  return (
    <div>
      <Container className="mt-4">
        <h2 className="section-title">Visualización de los datos</h2>
        <Container>
          <LineChart data={[...data]} />
          <ColumnComparisonChart data={[...data]} />
          <ColumnDrilldown data={[...data]} />
        </Container>
      </Container>
    </div>
  );
}

export default TouristStayGraph;
