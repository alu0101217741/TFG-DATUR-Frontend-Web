import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "./StackedBarChart.css";

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
    legend: {
      reversed: true,
    },
    plotOptions: {
      series: {
        stacking: "normal",
      },
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
        categories: countries, // Countries
      },
      series: [
        {
          name: "Cuarto trimestre",
          data: fourthTrimester,
        },
        {
          name: "Tercer trimestre",
          data: thirdTrimester,
        },
        {
          name: "Segundo trimestre",
          data: secondTrimester,
        },
        {
          name: " Primer trimestre",
          data: firstTrimester,
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
        text: `Rankings de nacionalidades en ${year}`,
      },
      xAxis: {
        categories: dataToBeShow.map((item) => item.country), // Countries
      },
      series: [
        {
          name: "Cuarto trimestre",
          data: dataToBeShow.map((item) => item.fourthTrimester),
        },
        {
          name: "Tercer trimestre",
          data: dataToBeShow.map((item) => item.thirdTrimester),
        },
        {
          name: "Segundo trimestre",
          data: dataToBeShow.map((item) => item.secondTrimester),
        },
        {
          name: " Primer trimestre",
          data: dataToBeShow.map((item) => item.firstTrimester),
        },
      ],
    });
  };

  return (
    <div>
      <Container className="mt-4">
        <h3>Nacionalidades que visitan Canarias</h3>
        <Container>
          <p>
            En esta gráfica se refleja bastante información acerca de las
            nacionalidades que visitan Canarias. Se encuentran disponibles los
            últimos cuatro últimos años de los que se tienen datos, para estos
            años se muestra el ranking de las nacionalidades que visitan las
            islas, para cada una de las nacionalidades se refleja el número de
            turistas por cada trimestre, lo que hace posible conocer la
            distribución de los turistas a lo largo del año.
          </p>
          <ButtonGroup
            aria-label="Years to be paint in the graph"
            className="mx-auto"
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

export default StackedBarChart;
