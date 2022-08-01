import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function trimesterMapper(trimesterInNumber) {
  switch (trimesterInNumber) {
    case "01":
      return "primer";
    case "04":
      return "segundo";
    case "07":
      return "tercer";
    case "10":
      return "cuarto";
    default:
      return "Trimestre no válido";
  }
}

function SemiCircleDonutChart({ data }) {
  const [chartExplication, setChartExplication] = useState({
    trimester: "",
    previousYear: "",
    increase: "",
    decrease: "",
    stability: "",
  });

  const [chartOptions, setChartOptions] = useState({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      shadow: true,
    },
    title: {
      text: "Expectativas<br>tendencia<br>ocupación",
      align: "center",
      verticalAlign: "middle",
      y: 60,
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{series.name}</span><table>',
      pointFormat:
        "<tr><td>{point.name}: <b>{point.percentage:.1f}%</b></td></tr>",
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: -50,
          style: {
            fontWeight: "bold",
            color: "white",
            fontSize: "16px",
          },
        },
        startAngle: -90,
        endAngle: 90,
        center: ["50%", "75%"],
        size: "110%",
      },
    },
  });

  const [secondChartOptions, setSecondChartOptions] = useState({
    chart: {
      type: "column",
      shadow: true,
    },
    title: {
      text: "Grado de ocupación previsto para cada mes",
    },
    subtitle: {
      text: "Fuente: Instituto Canario de Estadística",
    },
    xAxis: {
      categories: ["1º mes", "2º mes", "3º mes"],
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Porcentaje de ocupación",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b> {point.y} %</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
  });

  useEffect(() => {
    const dataSelected = data.slice(0, 1);

    const year = dataSelected.map((item) => {
      return item.trimester.slice(0, 4);
    });

    const trimester = dataSelected.map((item) => {
      return trimesterMapper(item.trimester.slice(5));
    });

    const dataToFirstChart = dataSelected
      .map((item) => {
        return [
          item.occupancyRateTrend.increase,
          item.occupancyRateTrend.decrease,
          item.occupancyRateTrend.stability,
        ];
      })
      .flat();

    const dataForSecondChart = dataSelected.map((item) => {
      return item.expectedOccupancyByMonth.map((month) => {
        return month.occupancyRate;
      });
    });

    setChartOptions({
      series: [
        {
          type: "pie",
          name: "Expectativa de ocupación",
          innerSize: "50%",
          data: [
            ["Aumento", dataToFirstChart[0]],
            ["Descenso", dataToFirstChart[1]],
            ["Estabilidad", dataToFirstChart[2]],
          ],
        },
      ],
    });

    setSecondChartOptions({
      series: [
        {
          name: "Grado de ocupación",
          data: dataForSecondChart.flat(),
        },
      ],
    });

    setChartExplication({
      trimester: trimester[0],
      previousYear: Number(year[0]) - 1,
      increase: dataToFirstChart[0],
      decrease: dataToFirstChart[1],
      stability: dataToFirstChart[2],
    });
  }, [data]);

  return (
    <div>
      <Container className="mt-4">
        <h3>Grado de ocupación</h3>
        <Container>
          <p>
            En cuanto a la tendencia del grado de ocupación para el{" "}
            {chartExplication.trimester} trimestre de{" "}
            {chartExplication.previousYear + 1}, en relación a{" "}
            {chartExplication.previousYear}, el {chartExplication.increase}% de
            los hosteleros piensa que subirá, mientras que el{" "}
            {chartExplication.decrease}% opina que descenderá, por último el{" "}
            {chartExplication.stability}% considera que no cambiará.
          </p>
          <Row>
            <Col xs={12} lg={6}>
              <HighchartsReact highcharts={Highcharts} options={chartOptions} />
            </Col>
            <Col xs={12} lg={6}>
              <HighchartsReact
                highcharts={Highcharts}
                options={secondChartOptions}
              />
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}

export default SemiCircleDonutChart;