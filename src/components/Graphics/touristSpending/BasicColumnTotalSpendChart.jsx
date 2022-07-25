import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highcharts3d from "highcharts/highcharts-3d";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

highcharts3d(Highcharts);

function BasicColumnTotalSpendChart({ data }) {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "column",
      shadow: true,
      options3d: {
        enabled: true,
        alpha: 10,
        beta: 10,
        depth: 100,
      },
    },
    title: {
      text: "Gasto total por trimestre",
    },
    subtitle: {
      text: "Fuente: Instituto Canario de Estadística",
    },
    xAxis: {
      crosshair: true,
      labels: {
        skew3d: true,
        style: {
          fontSize: "16px",
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Gasto",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} €</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
      column: {
        depth: 25,
      },
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
  });

  useEffect(() => {
    const dataYears = data.slice(0, 5).map((item) => item.year);

    const dataValue = data.slice(0, 5).reverse();

    const values = [
      { name: "Primer trimestre", data: [] },
      { name: "Segundo trimestre", data: [] },
      { name: "Tercer trimestre", data: [] },
      { name: "Cuarto trimestre", data: [] },
    ];

    dataValue.forEach((item) => {
      item.data.forEach((element) => {
        if (element.trimester.slice(4) === "Q1")
          values[0].data.push(element.totalSpending);
        if (element.trimester.slice(4) === "Q2")
          values[1].data.push(element.totalSpending);
        if (element.trimester.slice(4) === "Q3")
          values[2].data.push(element.totalSpending);
        if (element.trimester.slice(4) === "Q4")
          values[3].data.push(element.totalSpending);
      });
    });

    setChartOptions({
      xAxis: {
        categories: dataYears.reverse(),
      },
      series: values,
    });
  }, [data]);

  return (
    <div>
      <Container className="mt-4">
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

export default BasicColumnTotalSpendChart;
