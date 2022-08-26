import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useRef, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const ChartType = {
  LINE: "líneas",
  COLUMN: "columnas",
  AREA: "area",
};

function LineCharts({ data }) {
  const chartComponent = useRef({});
  const [chartTypeToShow, setchartTypeToShow] = useState("líneas");
  const [chartType, setChartType] = useState("line");

  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "line",
      shadow: true,
    },
    title: {
      text: "Evolución del número de turistas",
    },
    subtitle: {
      text: 'Fuente: <a target="_blank" href="http://www.gobiernodecanarias.org/istac/">Instituto Canario de Estadística</a>',
    },
    yAxis: {
      title: {
        text: "Millones de turistas",
      },
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
      },
      series: {
        label: {
          connectorAllowed: false,
        },
        pointStart: 2010,
      },
    },
    credits: {
      enabled: false,
    },
  });

  useEffect(() => {
    const dataMapping = data.reverse().map((item) => item.totalTourists);
    setChartOptions({
      chart: {
        type: chartType,
      },
      series: [{ name: "Número de turistas", data: dataMapping }],
    });
  }, [data, chartType]);

  const handleSelect = (chartTypeSelected) => {
    setChartOptions({
      series: [],
    });

    setchartTypeToShow(chartTypeSelected);

    switch (chartTypeSelected) {
      case ChartType.LINE:
        setChartType("line");
        break;
      case ChartType.AREA:
        setChartType("area");
        break;
      case ChartType.COLUMN:
        setChartType("column");
        break;
      default:
        throw Error("Unknown chart type");
    }
  };

  return (
    <div>
      <div className="mt-4">
        <h3>Número total de turistas por año</h3>
        <div className="mt-3">
          <p>
            Como primera gráfica se muestra la evolución del número de turistas
            a lo largo de los años, se puedo observar que este número ha
            aumentado progresivamente. Destaca el descenso que se produce en el
            año 2020 debido a la pandemia del COVID-19.
          </p>
          <DropdownButton
            title={"Tipo de gráfico: " + chartTypeToShow}
            onSelect={handleSelect}
            className="dropdown-button-center"
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
          <HighchartsReact
            ref={chartComponent}
            highcharts={Highcharts}
            options={chartOptions}
          />
        </div>
      </div>
    </div>
  );
}

export default LineCharts;
