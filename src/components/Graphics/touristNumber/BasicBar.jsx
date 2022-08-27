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
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
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

    const touristsByIsland = firstData.map((item) => item.tourists);

    setChartOptions({
      title: {
        text: `Distribución de turistas por isla en ${years[0]}`,
      },
      xAxis: {
        categories: islands,
        title: {
          text: null,
        },
      },
      series: [
        {
          name: "Número de turistas",
          data: touristsByIsland,
          color: "#2f7ed8",
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
        text: `Distribución de turistas por isla en ${year}`,
      },
      xAxis: {
        categories: dataToBeShow.map((item) => item.island),
        title: {
          text: null,
        },
      },
      series: [
        {
          name: "Número de turistas",
          data: dataToBeShow.map((item) => item.tourists),
        },
      ],
    });
  };

  return (
    <div>
      <div className="mt-4">
        <h3>Distribución de los turistas</h3>
        <div className="mt-3">
          <p>
            Se muestra el número de turistas que visitan cada una de las Islas
            Canarias, están disponibles los últimos cuatro de los que se tienen
            datos. Cabe destacar que se agrupan la cantidad de turistas que han
            visitado La Gomera y el Hierro, ya que este valor se ha estimado a
            través de la información del resto de islas y el total de turistas
            llegados a Canarias. Se ha llevado a cabo esta estimación debido a
            la falta de información para estas dos islas en la fuente oficial.
          </p>
          <Container>
            <ButtonGroup
              aria-label="Years to be paint in the graph"
              className="center-custom-button"
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
        </div>
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
    </div>
  );
}

export default BasicBar;
