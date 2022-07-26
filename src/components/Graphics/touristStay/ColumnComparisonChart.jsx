import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const COUNTRIES = [
  {
    name: "Alemania",
    flag: "de",
    color: "#2f7ed8",
  },
  {
    name: "España",
    flag: "es",
    color: "#f28f43",
  },
  {
    name: "Reino Unido",
    flag: "gb",
    color: "#492970",
  },
  {
    name: "Países Nórdicos",
    flag: "pn",
    color: "#c42525",
  },
  {
    name: "Otros países",
    flag: "op",
    color: "#0DAF12",
  },
];

function ColumnComparisonChart({ data }) {
  const [dataSelected, setDataSelected] = useState([]);
  const [years, setYears] = useState([]);
  const [activeYear, setActiveYear] = useState();
  const [comparativeYear, setComparativeYear] = useState();
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "column",
      shadow: true,
    },
    plotOptions: {
      series: {
        grouping: false,
        borderWidth: 0,
      },
      column: {
        borderRadius: 6,
        borderWidth: 0.5,
        borderColor: "#000000",
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      headerFormat:
        '<span style="font-size: 15px">{point.point.name}</span><br/>',
      pointFormat:
        '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y} días</b><br/>',
    },
    xAxis: {
      type: "category",
      accessibility: {
        description: "Países",
      },
    },
    yAxis: [
      {
        title: {
          text: "Días",
        },
        showFirstLabel: false,
      },
    ],
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
      const dataSelected = data.map((item) => {
        return {
          year: item.year,
          stayByResidencePlaces: item.stayByResidencePlaces,
        };
      });

      const years = dataSelected.map((item) => item.year.toString());

      setDataSelected(dataSelected);

      setYears(years);

      setActiveYear(years[0]);

      setComparativeYear(years[1]);

      const firstData = dataSelected[0];

      const secondData = dataSelected[1];

      const firstDataToBeShow = firstData.stayByResidencePlaces.map(
        (element) => {
          return [element.residencePlace, element.averageStay];
        }
      );

      const firstDataName = firstData.year;

      const secondDataToBeShow = secondData.stayByResidencePlaces.map(
        (element) => {
          return [element.residencePlace, element.averageStay];
        }
      );

      const secondDataName = secondData.year;

      setChartOptions({
        title: {
          text: `Estancia media según lugar de residencia en ${years[0]}`,
          align: "center",
        },
        subtitle: {
          text: `Comparando los resultados con ${years[0] - 1}`,
          align: "center",
        },
        series: [
          {
            color: "rgb(158, 159, 163)",
            pointPlacement: -0.2,
            linkedTo: "main",
            data: secondDataToBeShow,
            name: secondDataName,
          },
          {
            name: firstDataName,
            id: "main",
            dataSorting: {
              enabled: true,
              matchByName: true,
            },
            dataLabels: [
              {
                enabled: true,
                inside: true,
                style: {
                  fontSize: "16px",
                },
              },
            ],
            data: getData(firstDataToBeShow),
          },
        ],
      });
    }
  }, [data]);

  const getData = (data) =>
    data.map((item, i) => {
      return {
        name: item[0],
        y: item[1],
        color: COUNTRIES[i].color,
      };
    });

  const handleSelect = (year, comparativeYear) => {
    const indexActualYear = years.indexOf(year);
    const indexPreviousYear = years.indexOf(comparativeYear);

    const actualDataToBeShow = dataSelected[
      indexActualYear
    ].stayByResidencePlaces.map((element) => {
      return [element.residencePlace, element.averageStay];
    });

    setChartOptions({
      title: {
        text: `Estancia media según lugar de residencia en ${year}`,
        align: "center",
      },
      subtitle: {
        text: `Comparando los resultados con ${comparativeYear}`,
        align: "center",
      },
      series: [
        {
          color: "rgb(158, 159, 163)",
          pointPlacement: -0.2,
          linkedTo: "main",
          data: dataSelected[indexPreviousYear].stayByResidencePlaces.map(
            (item) => {
              return [item.residencePlace, item.averageStay];
            }
          ),
          name: dataSelected[indexPreviousYear].year.toString(),
        },
        {
          name: dataSelected[indexActualYear].year.toString(),

          id: "main",
          dataSorting: {
            enabled: true,
            matchByName: true,
          },
          dataLabels: [
            {
              enabled: true,
              inside: true,
              style: {
                fontSize: "16px",
              },
            },
          ],
          data: getData(actualDataToBeShow),
        },
      ],
    });
  };

  const handleActiveYear = (activeYearSelected) => {
    setActiveYear(activeYearSelected);
    handleSelect(activeYearSelected, comparativeYear);
  };

  const handleComparativeYear = (comparativeYearSelected) => {
    setComparativeYear(comparativeYearSelected);
    handleSelect(activeYear, comparativeYearSelected);
  };

  return (
    <div>
      <div className="mt-4">
        <h3>Estancia media según lugar de residencia</h3>
        <div className="mt-3">
          <p>
            Se muestra el número de días que permanecen de media los turistas en
            Canarias según su país de origen. Se ofrece la posibilidad de
            visualizar esta información para una gran cantidad de años, además
            también se puede comparar la información del año seleccionado con
            cualquier otro dentro de los disponibles. Cabe destacar que en la
            fuente oficial sólo existían datos para España a partir de 2019, por
            ello en las gráficas, esta columna se muestra a cero para años
            anteriores.
          </p>
          <Container className="center-buttons">
            <DropdownButton
              title={"Año: " + activeYear}
              onSelect={handleActiveYear}
              className="d-inline mx-2"
            >
              {years.map((year) => (
                <Dropdown.Item eventKey={year} key={year}>
                  {year}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <DropdownButton
              title={"Comparando con: " + comparativeYear}
              onSelect={handleComparativeYear}
              className="d-inline mx-2"
            >
              {years.map((year) => (
                <Dropdown.Item eventKey={year} key={year}>
                  {year}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Container>
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

export default ColumnComparisonChart;
