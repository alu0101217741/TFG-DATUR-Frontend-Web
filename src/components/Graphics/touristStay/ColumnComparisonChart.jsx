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
    color: "rgb(201, 36, 39)",
  },
  {
    name: "España",
    flag: "es",
    color: "rgb(201, 36, 39)",
  },
  {
    name: "Reino Unido",
    flag: "gb",
    color: "rgb(0, 82, 180)",
  },
  {
    name: "Países Nórdicos",
    flag: "pn",
    color: "rgb(0, 0, 0)",
  },
  {
    name: "Otros países",
    flag: "op",
    color: "rgb(240, 240, 240)",
  },
];

function ColumnComparisonChart({ data }) {
  const [dataSelected, setDataSelected] = useState([]);
  const [years, setYears] = useState([]);
  const [activeYear, setActiveYear] = useState();
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
      allowHTML: true,
    },
  });

  useEffect(() => {
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

    const firstData = dataSelected.slice(0, 1).flat();

    const secondData = dataSelected.slice(1, 2).flat();

    const firstDataToBeShow = firstData.map((element) => {
      return element.stayByResidencePlaces.map((item) => {
        return [item.residencePlace, item.averageStay];
      });
    });

    const firstDataName = firstData.map((element) => {
      return element.year;
    });

    const secondDataToBeShow = secondData.map((element) => {
      return element.stayByResidencePlaces.map((item) => {
        return [item.residencePlace, item.averageStay];
      });
    });

    const secondDataName = secondData.map((element) => {
      return element.year;
    });

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
          data: secondDataToBeShow[0],
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
          data: getData(firstDataToBeShow)[0],
        },
      ],
    });
  }, [data]);

  const getData = (data) =>
    data.map((item) => {
      return item.map((country, i) => ({
        name: country[0],
        y: country[1],
        color: COUNTRIES[i].color,
      }));
    });

  const handleSelect = (year) => {
    setActiveYear(year);

    const indexActualYear = years.indexOf(year);
    const indexPreviousYear = indexActualYear + 1;

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
        text: `Comparando los resultados con ${year - 1}`,
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
          data: getData([actualDataToBeShow])[0],
        },
      ],
    });
  };

  return (
    <div>
      {
        <Container className="mt-4">
          <h3>Estancia media según lugar de residencia</h3>
          <Container>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
            <DropdownButton
              title={activeYear}
              onSelect={handleSelect}
              className="dropdown-button-center"
            >
              {years.map((year) => (
                <Dropdown.Item eventKey={year}>{year}</Dropdown.Item>
              ))}
            </DropdownButton>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          </Container>
        </Container>
      }
    </div>
  );
}

export default ColumnComparisonChart;
