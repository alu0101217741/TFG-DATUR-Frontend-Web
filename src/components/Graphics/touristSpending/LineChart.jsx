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
      text: "Evolución del gasto turístico",
    },
    subtitle: {
      text: "Fuente: Instituto Canario de Estadística",
    },
    yAxis: {
      title: {
        text: "Gasto total",
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
    const dataValues = data.map((item) => {
      let totalYear = 0;
      item.data.forEach((element) => {
        totalYear += element.totalSpending;
      });
      return Math.trunc(totalYear);
    });

    setChartOptions({
      xAxis: {
        categories: dataYears,
      },
      series: [
        {
          name: "Gasto total",
          data: dataValues,
        },
      ],
    });
  }, [data]);

  return (
    <div>
      <Container className="mt-4">
        <h3>Estancia media de los turistas por año</h3>
        <Container>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </Container>
      </Container>
    </div>
  );
}

export default LineChart;
