import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const ChartType = {
  LINE: "líneas",
  COLUMN: "columnas",
  AREA: "area",
};

const PeriodTime = {
  YEAR: "año",
  TRIMESTER: "trimestre",
};

function LineChart({ data }) {
  const [chartTypeToShow, setchartTypeToShow] = useState("líneas");

  const [dataForYears, setDataForYears] = useState();

  const [dataForTrimesters, setDataForTrimester] = useState();

  const [periodTime, setPeriodTime] = useState(PeriodTime.YEAR);

  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "line",
      shadow: true,
    },
    title: {
      text: "Evolución del gasto turístico",
    },
    subtitle: {
      text: 'Fuente: <a target="_blank" href="http://www.gobiernodecanarias.org/istac/">Instituto Canario de Estadística</a>',
    },
    yAxis: {
      title: {
        text: "Gasto total (€)",
      },
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    tooltip: {
      valueSuffix: " €",
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
    if (data.length > 0) {
      // Data for years
      const dataYears = data.reverse().map((item) => item.year);
      const dataValuesForYears = data.map((item) => {
        let totalYear = 0;
        item.data.forEach((element) => {
          totalYear += element.totalSpending;
        });
        return Math.trunc(totalYear);
      });

      setDataForYears(dataValuesForYears);

      // Data for trimester
      const dataValue = data.slice(0, 5);

      const valuesForTrimester = [
        { name: "Primer trimestre", data: [], color: "#2f7ed8" },
        { name: "Segundo trimestre", data: [], color: "#f28f43" },
        { name: "Tercer trimestre", data: [], color: "#492970" },
        { name: "Cuarto trimestre", data: [], color: "#c42525" },
      ];

      dataValue.forEach((item) => {
        item.data.forEach((element) => {
          if (element.trimester.slice(4) === "Q1")
            valuesForTrimester[0].data.push(element.totalSpending);
          if (element.trimester.slice(4) === "Q2")
            valuesForTrimester[1].data.push(element.totalSpending);
          if (element.trimester.slice(4) === "Q3")
            valuesForTrimester[2].data.push(element.totalSpending);
          if (element.trimester.slice(4) === "Q4")
            valuesForTrimester[3].data.push(element.totalSpending);
        });
      });

      setDataForTrimester(valuesForTrimester);

      setChartOptions({
        xAxis: {
          categories: dataYears,
        },
        series: [
          {
            name: "Gasto total",
            data: dataValuesForYears,
            color: "#2f7ed8",
          },
        ],
      });
    }
  }, [data]);

  const handleSelect = (periodTime, chartType) => {
    const chart = chartType
      ? {
          type: chartType.type,
        }
      : {};

    const animation = chartType
      ? { duration: chartType.duration, easing: "easeOutBounce" }
      : {};

    if (periodTime === PeriodTime.YEAR) {
      setChartOptions({
        chart,
        series: [
          {
            name: "Gasto total",
            data: dataForYears,
            color: "#2f7ed8",
            animation,
          },
        ],
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true,
            },
          },
        },
      });
    } else {
      const series = dataForTrimesters.map((element) => {
        return {
          ...element,
          animation,
        };
      });

      setChartOptions({
        chart,
        series,
        tooltip: {
          crosshairs: true,
          shared: true,
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: false,
            },
          },
        },
      });
    }
  };

  const handleChartType = (chartTypeSelected) => {
    let chart;
    let duration;
    switch (chartTypeSelected) {
      case ChartType.LINE:
        chart = "line";
        duration = 1800;
        break;
      case ChartType.AREA:
        chart = "area";
        duration = 1700;
        break;
      case ChartType.COLUMN:
        chart = "column";
        duration = 1600;
        break;
      default:
        throw Error("Unknown chart type");
    }

    setchartTypeToShow(chartTypeSelected);

    const chartType = {
      type: chart,
      duration: duration,
    };

    handleSelect(periodTime, chartType);
  };

  const handlePeriodTime = (periodTimeSelected) => {
    setPeriodTime(periodTimeSelected);
    handleSelect(periodTimeSelected);
  };

  return (
    <div>
      <div className="mt-4">
        <h3>Evolución del gasto turístico</h3>
        <div className="mt-3">
          <p>
            En esta gráfica se muestra la evolución del gasto turístico durante
            los últimos años, ofreciendo la posibilidad de observar los gastos
            totales anuales, o conocer estas cantidades por trimestre.
          </p>
          <Container className="center-buttons">
            <DropdownButton
              title={"Tipo de gráfico: " + chartTypeToShow}
              onSelect={handleChartType}
              className="d-inline mx-2"
            >
              <Dropdown.Item eventKey={ChartType.LINE}>
                {ChartType.LINE}
              </Dropdown.Item>
              <Dropdown.Item eventKey={ChartType.AREA}>
                {ChartType.AREA}
              </Dropdown.Item>
              <Dropdown.Item eventKey={ChartType.COLUMN}>
                {ChartType.COLUMN}
              </Dropdown.Item>
            </DropdownButton>
            <DropdownButton
              className="d-inline mx-2"
              title={"Organizar por: " + periodTime}
              onSelect={handlePeriodTime}
            >
              <Dropdown.Item eventKey={PeriodTime.YEAR}>
                {PeriodTime.YEAR}
              </Dropdown.Item>
              <Dropdown.Item eventKey={PeriodTime.TRIMESTER}>
                {PeriodTime.TRIMESTER}
              </Dropdown.Item>
            </DropdownButton>
          </Container>
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

export default LineChart;
