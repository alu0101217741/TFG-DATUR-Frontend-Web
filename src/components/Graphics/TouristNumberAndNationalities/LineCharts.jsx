import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

function LineCharts({ data }) {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      shadow: true,
    },
    title: {
      text: "Evolución del número de turistas",
    },
    subtitle: {
      text: "Fuente: Instituto Canario de Estadística",
    },
    yAxis: {
      title: {
        text: "Millones de turistas",
      },
    },
    xAxis: {
      accessibility: {
        rangeDescription: "Range: 2010 to 2022",
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
      },
      series: {
        label: {
          connectorAllowed: false,
        },
        pointStart: 2010,
      },
    },
    series: [
      {
        name: "Número de turistas",
        data: [],
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    const dataMapping = data.reverse().map((item) => item.totalTourists);
    setChartOptions({
      series: [{ data: dataMapping }],
    });
  }, [data]);

  return (
    <div>
      <Container className="mt-4">
        <h3>Número total de turistas por año</h3>
        <Container>
          <p>
            Como primera gráfica se muestra la evolución del número de turistas
            a lo largo de los años, se puedo observar que este número ha
            aumentado progresivamente. Destaca el descenso que se produce en el
            año 2020 debido a la pandemia del COVID-19.
          </p>
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </Container>
      </Container>
    </div>
  );
}

export default LineCharts;
