import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getDataFromApi } from "../../services/getDataFromApi";
import SemiCircleDonutChartBussinesChart from "../Graphics/touristExpectations/SemiCircleDonutChartBussinesChart";
import SemiCircleDonutChartMainFactorsChart from "../Graphics/touristExpectations/SemiCircleDonutChartMainFactorsChart";

function BusinessProgressGraph() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getDataFromApi("/api/v1/businessProgressExpectation")
      .then(setData)
      .catch(console.log);
  }, []);
  return (
    <div>
      <Container className="mt-4 graph-container text-style">
        <Container>
          <SemiCircleDonutChartBussinesChart data={[...data]} />
          <SemiCircleDonutChartMainFactorsChart data={[...data]} />
        </Container>
      </Container>
    </div>
  );
}

export default BusinessProgressGraph;
