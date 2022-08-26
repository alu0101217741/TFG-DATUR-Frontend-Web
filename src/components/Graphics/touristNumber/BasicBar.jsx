import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "./BasicBar.css";

function compare(firstElement, secondElement) {
  if (firstElement.tourists > secondElement.tourists) {
    return -1;
  }
  if (firstElement.tourists < secondElement.tourists) {
    return 1;
  }
  return 0;
}

function BasicBar({ data }) {
  const [years, setYears] = useState([]);

  const [formattedDataFirstYear, setFormattedDataFirstYear] = useState([]);

  const [formattedDataSecondYear, setFormattedDataSecondYear] = useState([]);

  const [formattedDataThirdYear, setFormattedDataThirdYear] = useState([]);

  const [formattedDataFourthYear, setFormattedDataFourthYear] = useState([]);

  const [activeYear, setActiveYear] = useState(0);

  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "bar",
      shadow: true,
    },
    subtitle: {
      text: 'Fuente: <a target="_blank" href="http://www.gobiernodecanarias.org/istac/">Instituto Canario de Estadística</a>',
    },
    yAxis: {
      min: 0,
      title: {
        text: "Número de turistas",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
    },
    tooltip: {
      valueSuffix: " millions",
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
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
      return element.touristsByIslands.sort(compare);
    });

    setFormattedDataFirstYear(formattedDataAux[0]);
    setFormattedDataSecondYear(formattedDataAux[1]);
    setFormattedDataThirdYear(formattedDataAux[2]);
    setFormattedDataFourthYear(formattedDataAux[3]);

    const firstData = formattedDataAux.slice(0, 1).flat();

    const islands = firstData.map((item) => item.island);
    console.log(islands);

    const touristsByIsland = firstData.map((item) => item.tourists);

    console.log(touristsByIsland);

    setChartOptions({
      title: {
        text: `Distribución de turistas por isla en ${years[0]}`, // Ponerlo
      },
      xAxis: {
        categories: islands,
        title: {
          text: null,
        },
      },
      series: [
        {
          name: "Número de turistas", // Ponerlo ordenado
          data: touristsByIsland,
        },
      ],
    });
  }, [data]);

  const updateChartWithYear = (year) => {
    setActiveYear(year);

    const indexYear = years.indexOf(year);
    let dataToBeShow = [];

    if (indexYear === 0) dataToBeShow = formattedDataFirstYear;
    if (indexYear === 1) dataToBeShow = formattedDataSecondYear;
    if (indexYear === 2) dataToBeShow = formattedDataThirdYear;
    if (indexYear === 3) dataToBeShow = formattedDataFourthYear;

    setChartOptions({
      title: {
        text: `Distribución de turistas por isla en ${year}`, // Ponerlo
      },
      xAxis: {
        categories: dataToBeShow.map((item) => item.island),
        title: {
          text: null,
        },
      },
      series: [
        {
          name: "Número de turistas", // Ponerlo ordenado
          data: dataToBeShow.map((item) => item.tourists),
        },
      ],
    });
  };

  return (
    <div>
      <Container className="mt-4">
        <h3>Distribución de los turistas</h3>
        <Container className="mt-3">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <ButtonGroup
            aria-label="Years to be paint in the graph"
            className="mx-auto center-custom-button"
          >
            <Button
              variant="primary"
              onClick={() => {
                updateChartWithYear(years[3]);
              }}
              className={activeYear === years[3] ? "active" : ""}
            >
              {years[3]}
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                updateChartWithYear(years[2]);
              }}
              className={activeYear === years[2] ? "active" : ""}
            >
              {years[2]}
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                updateChartWithYear(years[1]);
              }}
              className={activeYear === years[1] ? "active" : ""}
            >
              {years[1]}
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                updateChartWithYear(years[0]);
              }}
              className={activeYear === years[0] ? "active" : ""}
            >
              {years[0]}
            </Button>
          </ButtonGroup>
        </Container>
        <Container>
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </Container>
      </Container>
    </div>
  );
}

export default BasicBar;
