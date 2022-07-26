import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./BasicColumnSpendChart.css";

function dataMapping(data) {
  const valuesAux = {
    accommodation: 0,
    nationalTransport: 0,
    localTransport: 0,
    feeding: 0,
    culture: 0,
    shopping: 0,
    other: 0,
  };

  data.forEach((item) => {
    item.data.forEach((element) => {
      element.spendingByConcept.forEach((element2) => {
        if (element2.concept === "Alojamiento")
          valuesAux.accommodation += element2.totalSpending;
        if (element2.concept === "Transporte nacional / internacional")
          valuesAux.nationalTransport += element2.totalSpending;
        if (element2.concept === "Transporte local")
          valuesAux.localTransport += element2.totalSpending;
        if (element2.concept === "Alimentación")
          valuesAux.feeding += element2.totalSpending;
        if (element2.concept === "Recreación, cultura y actividades deportivas")
          valuesAux.culture += element2.totalSpending;
        if (element2.concept === "Compras")
          valuesAux.shopping += element2.totalSpending;
        if (element2.concept === "Otros")
          valuesAux.other += element2.totalSpending;
      });
    });
  });

  const dataValue = [
    ["Alojamiento", Math.trunc(valuesAux.accommodation)],
    [
      "Transporte nacional / internacional",
      Math.trunc(valuesAux.nationalTransport),
    ],
    ["Transporte local", Math.trunc(valuesAux.localTransport)],
    ["Alimentación", Math.trunc(valuesAux.feeding)],
    ["Cultura y actividades deportivas", Math.trunc(valuesAux.culture)],
    ["Compras", Math.trunc(valuesAux.shopping)],
    ["Otros", Math.trunc(valuesAux.other)],
  ];

  return dataValue;
}

function BasicColumnSpendChart({ data }) {
  const [dataSelected, setDataSelected] = useState([]);
  const [years, setYears] = useState([]);
  const [activeYear, setActiveYear] = useState();
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "pie",

      shadow: true,
    },
  });

  useEffect(() => {
    const dataYears = data.slice(0, 5).map((item) => item.year);

    setDataSelected(data);

    setYears(dataYears);

    setActiveYear(dataYears[0]);

    const firstData = data.slice(0, 1);

    const value = dataMapping(firstData);

    setChartOptions({
      title: {
        text: `Desglose de gasto en ${dataYears[0]}`,
      },
      series: [
        {
          name: "Gasto",
          data: value,
        },
      ],
    });
  }, [data]);

  const handleSelect = (year) => {
    setActiveYear(year);

    const indexActualYear = years.indexOf(year);

    const value = dataMapping([dataSelected[indexActualYear]]);

    setChartOptions({
      title: {
        text: `Desglose de gasto en ${year}`,
      },
      series: [
        {
          name: "Gasto",
          data: value,
        },
      ],
    });
  };

  return (
    <div>
      <Container className="mt-4">
        <Container>
          <h3>Gasto turístico incluyendo desglose de gasto</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
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
    </div>
  );
}

export default BasicColumnSpendChart;
