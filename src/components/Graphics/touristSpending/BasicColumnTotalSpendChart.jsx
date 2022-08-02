import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highcharts3d from "highcharts/highcharts-3d";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

highcharts3d(Highcharts);

const TimeOption = {
  YEAR: "Año",
  MONTH: "Trimestre",
};

function BasicColumnTotalSpendChart({ data }) {
  const [timeOption, setTimeOption] = useState();

  const [trimestralData, setTrimestralData] = useState([]);

  const [annualData, setAnnualData] = useState([]);

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

    setTrimestralData(values);

    setTimeOption(TimeOption.YEAR);

    const yearsValues = [0, 0, 0, 0, 0];

    for (const value of values) {
      yearsValues[0] += value.data[0] || 0;
      yearsValues[1] += value.data[1] || 0;
      yearsValues[2] += value.data[2] || 0;
      yearsValues[3] += value.data[3] || 0;
      yearsValues[4] += value.data[4] || 0;
    }

    const annualDataValues = [
      {
        name: "Gasto total",
        data: yearsValues,
      },
    ];

    setAnnualData(annualDataValues);

    setChartOptions({
      xAxis: {
        categories: dataYears.reverse(),
      },
      series: annualDataValues,
    });
  }, [data]);

  const handleSelect = (timeOption) => {
    setTimeOption(timeOption);

    let values = trimestralData;

    if (timeOption === TimeOption.YEAR) {
      values = annualData;
    }

    setChartOptions({
      series: values,
    });
  };

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
          <DropdownButton
            title={timeOption}
            onSelect={handleSelect}
            className="dropdown-button-center"
          >
            <Dropdown.Item eventKey={TimeOption.YEAR}>
              {TimeOption.YEAR}
            </Dropdown.Item>
            <Dropdown.Item eventKey={TimeOption.MONTH}>
              {TimeOption.MONTH}
            </Dropdown.Item>
          </DropdownButton>
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </Container>
      </Container>
    </div>
  );
}

export default BasicColumnTotalSpendChart;
