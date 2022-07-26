import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./StackedBarChart.css";

const ChartType = {
  LINE: "líneas",
  COLUMN: "columnas",
  AREA: "area",
  BAR: "barras",
};

const PeriodTime = {
  YEAR: "año",
  TRIMESTER: "trimestre",
};

function compare(firstElement, secondElement) {
  const firstElementNumber =
    firstElement.firstTrimester +
    firstElement.secondTrimester +
    firstElement.thirdTrimester +
    firstElement.fourthTrimester;

  const secondElementNumber =
    secondElement.firstTrimester +
    secondElement.secondTrimester +
    secondElement.thirdTrimester +
    secondElement.fourthTrimester;

  if (firstElementNumber > secondElementNumber) {
    return -1;
  }
  if (firstElementNumber < secondElementNumber) {
    return 1;
  }
  return 0;
}

function StackedBarChart({ data }) {
  const [formattedDataFirstYear, setFormattedDataFirstYear] = useState([]);

  const [formattedDataSecondYear, setFormattedDataSecondYear] = useState([]);

  const [formattedDataThirdYear, setFormattedDataThirdYear] = useState([]);

  const [formattedDataFourthYear, setFormattedDataFourthYear] = useState([]);

  const [years, setYears] = useState([]);

  const [activeYear, setActiveYear] = useState(0);

  const [chartTypeToShow, setchartTypeToShow] = useState(ChartType.BAR);

  const [periodTime, setPeriodTime] = useState(PeriodTime.TRIMESTER);

  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "bar",
      shadow: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Número de turistas",
      },
    },
    subtitle: {
      text: 'Fuente: <a target="_blank" href="http://www.gobiernodecanarias.org/istac/">Instituto Canario de Estadística</a>',
    },
    legend: {
      reversed: true,
    },
    plotOptions: {
      series: {
        stacking: "normal",
      },
    },
    tooltip: {
      valueSuffix: " turistas",
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
    const firstsData = data.slice(0, 4);

    const years = firstsData.map((item) => item.year);

    setYears(years);

    setActiveYear(years[0]);

    const formattedDataAux = firstsData.map((element) => {
      return element.touristsByCountryAndTrimester
        .sort(compare)
        .filter((item) => item.country !== "Otros países");
    });

    setFormattedDataFirstYear(formattedDataAux[0]);
    setFormattedDataSecondYear(formattedDataAux[1]);
    setFormattedDataThirdYear(formattedDataAux[2]);
    setFormattedDataFourthYear(formattedDataAux[3]);

    const firstData = formattedDataAux.slice(0, 1).flat();

    const countries = firstData.map((item) => item.country);

    const firstTrimester = firstData.map((item) => item.firstTrimester);

    const secondTrimester = firstData.map((item) => item.secondTrimester);

    const thirdTrimester = firstData.map((item) => item.thirdTrimester);

    const fourthTrimester = firstData.map((item) => item.fourthTrimester);

    setChartOptions({
      title: {
        text: `Rankings de nacionalidades en ${years[0]}`,
      },
      xAxis: {
        categories: countries,
      },
      series: [
        {
          name: "Cuarto trimestre",
          data: fourthTrimester,
          color: "#2f7ed8",
        },
        {
          name: "Tercer trimestre",
          data: thirdTrimester,
          color: "#f28f43",
        },
        {
          name: "Segundo trimestre",
          data: secondTrimester,
          color: "#492970",
        },
        {
          name: " Primer trimestre",
          data: firstTrimester,
          color: "#c42525",
        },
      ],
    });
  }, [data]);

  const handleSelect = (year, period, chartType) => {
    const indexYear = years.indexOf(year);
    let dataToBeShow = [];

    if (indexYear === 0) dataToBeShow = formattedDataFirstYear;
    if (indexYear === 1) dataToBeShow = formattedDataSecondYear;
    if (indexYear === 2) dataToBeShow = formattedDataThirdYear;
    if (indexYear === 3) dataToBeShow = formattedDataFourthYear;

    const chart = chartType ? { type: chartType.type } : {};

    const animation = chartType
      ? {
          duration: chartType.duration,
          easing: "easeOutBounce",
        }
      : {};

    let series;
    if (period === PeriodTime.YEAR) {
      const totalByNationality = dataToBeShow.map((item) => {
        return (
          item.firstTrimester +
          item.secondTrimester +
          item.thirdTrimester +
          item.fourthTrimester
        );
      });

      series = [
        {
          name: "Número total de turistas",
          data: totalByNationality,
          animation: animation,
        },
      ];
    } else {
      series = [
        {
          name: "Cuarto trimestre",
          data: dataToBeShow.map((item) => item.fourthTrimester),
          animation: animation,
          color: "#2f7ed8",
        },
        {
          name: "Tercer trimestre",
          data: dataToBeShow.map((item) => item.thirdTrimester),
          animation: animation,
          color: "#f28f43",
        },
        {
          name: "Segundo trimestre",
          data: dataToBeShow.map((item) => item.secondTrimester),
          animation: animation,
          color: "#492970",
        },
        {
          name: " Primer trimestre",
          data: dataToBeShow.map((item) => item.firstTrimester),
          animation: animation,
          color: "#c42525",
        },
      ];
    }

    const tooltip =
      chartType?.type === "bar"
        ? {
            crosshairs: false,
            shared: false,
          }
        : {
            crosshairs: true,
            shared: true,
          };

    setChartOptions({
      title: {
        text: `Rankings de nacionalidades en ${year}`,
      },
      xAxis: {
        categories: dataToBeShow.map((item) => item.country),
      },
      chart,
      series,
      tooltip,
    });
  };

  const handleTypeChart = (chartTypeSelected) => {
    let chart;
    let duration;
    switch (chartTypeSelected) {
      case ChartType.BAR:
        chart = "bar";
        duration = 1800;
        break;
      case ChartType.LINE:
        chart = "line";
        duration = 1600;
        break;
      case ChartType.AREA:
        chart = "area";
        duration = 1400;
        break;
      case ChartType.COLUMN:
        chart = "column";
        duration = 1200;
        break;
      default:
        throw Error("Unknown chart type");
    }

    setchartTypeToShow(chartTypeSelected);

    const chartType = {
      type: chart,
      duration: duration,
    };

    handleSelect(activeYear, periodTime, chartType);
  };

  const handleYear = (yearSelected) => {
    setActiveYear(Number(yearSelected));
    handleSelect(Number(yearSelected), periodTime);
  };

  const handlePeriodTime = (periodTimeSelected) => {
    setPeriodTime(periodTimeSelected);
    handleSelect(activeYear, periodTimeSelected);
  };

  return (
    <div>
      <div className="mt-4">
        <h3>Nacionalidades que visitan Canarias</h3>
        <div className="mt-3">
          <p>
            En esta gráfica se muestran las principales nacionalidades que
            visitan Canarias, se ordenan según el número de turistas que llegan
            al archipiélago procedentes de ese país de origen. Para la consulta
            se encuentran disponibles los últimos cuatro años de los que se
            tienen datos, y se ofrece la posibilidad de organizar la información
            por año, lo que permite conocer el número total de turistas de cada
            nacionalidad, o por trimestre, lo que hace posible saber la
            distribución de los turistas a lo largo del año.
          </p>
        </div>

        <Container className="center-buttons">
          <DropdownButton
            className="d-inline mx-2"
            title={"Tipo de gráfico: " + chartTypeToShow}
            onSelect={handleTypeChart}
          >
            <Dropdown.Item eventKey={ChartType.BAR}>
              {ChartType.BAR}
            </Dropdown.Item>
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
            title={"Año: " + activeYear}
            onSelect={handleYear}
          >
            <Dropdown.Item eventKey={years[0]}>{years[0]}</Dropdown.Item>
            <Dropdown.Item eventKey={years[1]}>{years[1]}</Dropdown.Item>
            <Dropdown.Item eventKey={years[2]}>{years[2]}</Dropdown.Item>
            <Dropdown.Item eventKey={years[3]}>{years[3]}</Dropdown.Item>
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
  );
}

export default StackedBarChart;
