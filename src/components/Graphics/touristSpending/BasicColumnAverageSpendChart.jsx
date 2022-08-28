import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highcharts3d from "highcharts/highcharts-3d";
import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

highcharts3d(Highcharts);

const TimeOption = {
  YEAR: "año",
  MONTH: "trimestre",
};

function BasicColumnAverageSpendChart({ data }) {
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
      text: "Gasto medio por turista y día",
    },
    subtitle: {
      text: 'Fuente: <a target="_blank" href="http://www.gobiernodecanarias.org/istac/">Instituto Canario de Estadística</a>',
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
        text: "Gasto (€)",
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
    exporting: {
      buttons: {
        contextButton: {
          menuItems: [
            "viewFullscreen",
            "printChart",
            "downloadPDF",
            "downloadPNG",
            "downloadJPEG",
            "downloadSVG",
          ],
        },
      },
    },
    credits: {
      enabled: false,
    },
  });

  useEffect(() => {
    if (data.length !== 0) {
      const dataYears = data.slice(0, 5).map((item) => item.year);

      const dataValue = data.slice(0, 5).reverse();

      const values = [
        { name: "Primer trimestre", data: [], color: "#2f7ed8" },
        { name: "Segundo trimestre", data: [], color: "#f28f43" },
        { name: "Tercer trimestre", data: [], color: "#492970" },
        { name: "Cuarto trimestre", data: [], color: "#c42525" },
      ];

      dataValue.forEach((item) => {
        item.data.forEach((element) => {
          if (element.trimester.slice(4) === "Q1")
            values[0].data.push(element.averageSpendingByDay);
          if (element.trimester.slice(4) === "Q2")
            values[1].data.push(element.averageSpendingByDay);
          if (element.trimester.slice(4) === "Q3")
            values[2].data.push(element.averageSpendingByDay);
          if (element.trimester.slice(4) === "Q4")
            values[3].data.push(element.averageSpendingByDay);
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
          data: yearsValues.map((value) => parseFloat((value / 4).toFixed(2))),
          color: "#2f7ed8",
        },
      ];

      setAnnualData(annualDataValues);

      setChartOptions({
        xAxis: {
          categories: dataYears.reverse(),
        },
        series: annualDataValues,
      });
    }
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
      <div className="mt-4">
        <h3>Gasto medio por turista y día</h3>
        <div className="mt-3">
          <p>
            Se visualiza el gasto medio por día que realizan los turistas
            durante su estancia en el archipiélago, incluyendo datos anuales y
            trimestrales.
          </p>
          <DropdownButton
            title={"Organizar por: " + timeOption}
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
        </div>
      </div>
    </div>
  );
}

export default BasicColumnAverageSpendChart;
