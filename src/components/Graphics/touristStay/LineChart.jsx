import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

function LineChart({ data }) {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "line",
      shadow: true,
    },
    title: {
      text: "Evolución de la estancia media de turistas",
    },
    subtitle: {
      text: "Fuente: Instituto Canario de Estadística",
    },
    yAxis: {
      title: {
        text: "Estancia media",
      },
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
      },
    },
  });

  useEffect(() => {
    const dataYears = data.reverse().map((item) => item.year);
    const dataValues = data.reverse().map((item) => item.averageStay);

    setChartOptions({
      xAxis: {
        categories: dataYears, // Poner años
      },
      series: [
        {
          name: "Estancia media",
          data: dataValues, // Poner datos
        },
      ],
    });
  }, [data]);

  return (
    <div>
      <Container className="mt-4">
        <h3>Estancia media de los turistas por año</h3>
        <Container>
          <Container>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          </Container>
        </Container>
      </Container>
    </div>
  );
}

export default LineChart;
