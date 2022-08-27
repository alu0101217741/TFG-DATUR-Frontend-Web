import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function trimesterMapper(trimester) {
  const previousYear = Number(trimester.slice(0, 4)) - 1;
  return previousYear + trimester.slice(4);
}

function trimesterLabelMapper(trimester, capitalLetter) {
  const trimesterInNumber = trimester.slice(5);
  const year = trimester.slice(0, 4);

  let label;
  switch (trimesterInNumber) {
    case "01":
      label = capitalLetter ? "Primer trimestre" : "primer trimestre";
      break;
    case "04":
      label = capitalLetter ? "Segundo trimestre" : "segundo trimestre";
      break;
    case "07":
      label = capitalLetter ? "Tercer trimestre" : "tercer trimestre";
      break;
    case "10":
      label = capitalLetter ? "Cuarto trimestre" : "cuarto trimestre";
      break;
    default:
      label = "Trimestre no válido";
      break;
  }
  return label + " " + year;
}

function SemiCircleDonutChartBussinesChart({ data }) {
  const [chartExplication, setChartExplication] = useState({
    trimester: "",
    previousYear: "",
    favorable: "",
    normal: "",
    desfavorable: "",
  });

  const [chartOptions, setChartOptions] = useState({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      shadow: true,
    },
    title: {
      text: "Expectativas<br>tendencia marcha<br> del negocio",
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
    credits: {
      enabled: false,
    },
  });

  const [secondChartOptions, setSecondChartOptions] = useState({
    chart: {
      type: "bar",
      shadow: true,
    },
    title: {
      text: "Índice de confianza hotelera",
    },
    subtitle: {
      text: "Se compara el índice del trimestre actual con el mismo trimestre del año anterior",
    },
    yAxis: {
      min: 0,
      title: {
        text: "Confianza hotelera",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    legend: {
      layout: "bottom",
      align: "center",
    },
    credits: {
      enabled: false,
    },
  });

  useEffect(() => {
    if (data.length !== 0) {
      const dataSelected = data[0];

      const year = dataSelected.trimester.slice(0, 4);

      const previousTrimester = trimesterMapper(dataSelected.trimester);

      const previousData = data.find((item) => {
        return item.trimester === previousTrimester;
      });

      const businessTendencyFirstChart = [
        ["Favorable", dataSelected.businessProgressTendency.favorable],
        ["Normal", dataSelected.businessProgressTendency.normal],
        ["Desfavorable", dataSelected.businessProgressTendency.unfavorable],
      ];

      const hotelConfidenceIndexes = [
        dataSelected.hotelConfidenceIndex,
        previousData.hotelConfidenceIndex,
      ];

      setChartExplication({
        trimester: trimesterLabelMapper(dataSelected.trimester, false),
        previousYear: Number(year) - 1,
        favorable: businessTendencyFirstChart[0][1],
        normal: businessTendencyFirstChart[1][1],
        desfavorable: businessTendencyFirstChart[2][1],
      });

      setChartOptions({
        series: [
          {
            type: "pie",
            name: "Expectativa marcha del negocio",
            innerSize: "50%",
            data: businessTendencyFirstChart,
          },
        ],
      });

      setSecondChartOptions({
        xAxis: {
          categories: [
            trimesterLabelMapper(dataSelected.trimester, true),
            trimesterLabelMapper(previousData.trimester, true),
          ],
          title: {
            text: null,
          },
        },
        series: [
          {
            name: "Indice de confianza hotelera",
            data: hotelConfidenceIndexes,
            color: "#2f7ed8",
          },
        ],
      });
    }
  }, [data]);

  return (
    <div>
      <div className="mt-4">
        <h3>Marcha del negocio {chartExplication.trimester}</h3>
        <div className="mt-3 semicircle-style">
          <p>
            En cuanto a la marcha del negocio para el{" "}
            {chartExplication.trimester}, en relación a{" "}
            {chartExplication.previousYear}, el {chartExplication.favorable}% de
            los hosteleros piensa que será favorable, mientras que el{" "}
            {chartExplication.desfavorable}% opina que será desfavorable, por
            último el {chartExplication.normal}% considera que será normal.
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
        </div>
      </div>
    </div>
  );
}

export default SemiCircleDonutChartBussinesChart;
