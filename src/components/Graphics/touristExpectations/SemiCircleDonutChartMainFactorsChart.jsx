import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const MainFactors = {
  BUSINESS_VOLUME: "Facturación (Volumen de negocio)",
  HIRED_STAFF: "Empleo (personal contratado)",
  INVESTMENT: "Inversión",
  PRICE_LEVEL: "Nivel de precios",
};

const MainFactorsToPrint = {
  BUSINESS_VOLUME: "Facturación",
  HIRED_STAFF: "Empleo",
  INVESTMENT: "Inversión",
  PRICE_LEVEL: "Nivel de<br>precios",
};

function SemiCircleDonutChartMainFactorsChart({ data }) {
  const [activeFactor, setActiveFactor] = useState();
  const [chartOptions, setChartOptions] = useState({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      shadow: true,
    },
    title: {
      align: "center",
      verticalAlign: "middle",
      y: 60,
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{series.name}</span><table>',
      pointFormat:
        "<tr><td>{point.name}: <b>{point.percentage:.1f}%</b></td></tr>",
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: -50,
          style: {
            fontWeight: "bold",
            color: "white",
            fontSize: "16px",
          },
        },
        startAngle: -90,
        endAngle: 90,
        center: ["50%", "75%"],
        size: "110%",
      },
    },
  });

  const [mainFactorsExpectations, setMainFactorsExpectations] = useState();

  useEffect(() => {
    if (data.length !== 0) {
      const dataSelected = data[0];

      setMainFactorsExpectations(dataSelected.mainFactorsExpectations);

      const chartValue = [
        [
          "Aumento",
          dataSelected.mainFactorsExpectations.businessVolume.increase,
        ],
        [
          "Descenso",
          dataSelected.mainFactorsExpectations.businessVolume.decline,
        ],
        [
          "Estabilidad",
          dataSelected.mainFactorsExpectations.businessVolume.stability,
        ],
      ];

      setActiveFactor(MainFactors.BUSINESS_VOLUME);

      setChartOptions({
        title: {
          text: "Expectativas<br>en " + MainFactorsToPrint.BUSINESS_VOLUME,
        },
        series: [
          {
            type: "pie",
            name: "Expectativa marcha del negocio",
            innerSize: "50%",
            data: chartValue,
          },
        ],
      });
    }
  }, [data]);

  const handleSelect = (mainFactorSelected) => {
    let mainFactors;
    let title;

    switch (mainFactorSelected) {
      case MainFactors.BUSINESS_VOLUME:
        mainFactors = mainFactorsExpectations.businessVolume;
        title = MainFactorsToPrint.BUSINESS_VOLUME;
        break;
      case MainFactors.HIRED_STAFF:
        mainFactors = mainFactorsExpectations.hiredStaff;
        title = MainFactorsToPrint.HIRED_STAFF;
        break;
      case MainFactors.INVESTMENT:
        mainFactors = mainFactorsExpectations.investment;
        title = MainFactorsToPrint.INVESTMENT;
        break;
      case MainFactors.PRICE_LEVEL:
        mainFactors = mainFactorsExpectations.priceLevel;
        title = MainFactorsToPrint.PRICE_LEVEL;
        break;
      default:
        mainFactors = mainFactorsExpectations.businessVolume;
        title = MainFactorsToPrint.BUSINESS_VOLUME;
        break;
    }

    const chartValue = [
      ["Aumento", mainFactors.increase],
      ["Descenso", mainFactors.decline],
      ["Estabilidad", mainFactors.stability],
    ];

    setActiveFactor(mainFactorSelected);

    setChartOptions({
      title: {
        text: "Expectativas<br>en " + title,
      },
      series: [
        {
          type: "pie",
          name: "Expectativa marcha del negocio",
          innerSize: "50%",
          data: chartValue,
        },
      ],
    });
  };

  return (
    <div>
      <Container className="mt-4">
        <h3>Factores de la marcha del negocio</h3>
        <Container>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <DropdownButton
            title={activeFactor}
            onSelect={handleSelect}
            className="dropdown-button-center"
          >
            <Dropdown.Item eventKey={MainFactors.BUSINESS_VOLUME}>
              {MainFactors.BUSINESS_VOLUME}
            </Dropdown.Item>
            <Dropdown.Item eventKey={MainFactors.HIRED_STAFF}>
              {MainFactors.HIRED_STAFF}
            </Dropdown.Item>
            <Dropdown.Item eventKey={MainFactors.INVESTMENT}>
              {MainFactors.INVESTMENT}
            </Dropdown.Item>
            <Dropdown.Item eventKey={MainFactors.PRICE_LEVEL}>
              {MainFactors.PRICE_LEVEL}
            </Dropdown.Item>
          </DropdownButton>
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </Container>
      </Container>
    </div>
  );
}

export default SemiCircleDonutChartMainFactorsChart;
