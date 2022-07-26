import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getDataFromApi } from "../../services/getDataFromApi";
import ColumnComparisonChart from "../Graphics/touristStay/ColumnComparisonChart";
import ColumnDrilldownStayByAccommodations from "../Graphics/touristStay/ColumnDrilldownStayByAccommodations";
import ColumnDrilldownStayByIslandChart from "../Graphics/touristStay/ColumnDrilldownStayByIslandChart";
import LineChart from "../Graphics/touristStay/LineChart";

function TouristStayGraph() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getDataFromApi("/api/v1/touristStay").then(setData).catch(console.log);
  }, []);

  return (
    <div>
      <Container className="mt-4 graph-container text-style">
        <h2 className="section-title">Visualización de los datos</h2>
        <Container>
          <LineChart data={[...data]} />
          <ColumnComparisonChart data={[...data]} />
          <ColumnDrilldownStayByIslandChart data={[...data]} />
          <ColumnDrilldownStayByAccommodations data={[...data]} />
        </Container>
      </Container>
    </div>
  );
}

export default TouristStayGraph;
