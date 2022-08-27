import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const ChartType = {
  LINE: "líneas",
  COLUMN: "columnas",
  AREA: "area",
};

function LineCharts({ data }) {
  const [chartTypeToShow, setchartTypeToShow] = useState("lineas");

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
      series: [
        { name: "Número de turistas", data: dataMapping, color: "#2f7ed8" },
      ],
    });
  }, [data]);

  const handleSelect = (chartTypeSelected) => {
    let chart;
    let duration;
    switch (chartTypeSelected) {
      case ChartType.LINE:
        chart = "line";
        duration = 2000;
        break;
      case ChartType.AREA:
        chart = "area";
        duration = 1700;
        break;
      case ChartType.COLUMN:
        chart = "column";
        duration = 1500;
        break;
      default:
        throw Error("Unknown chart type");
    }

    setChartOptions({
      chart: {
        type: chart,
      },
      series: {
        animation: {
          duration: duration,
          easing: "easeOutBounce",
        },
      },
    });

    setchartTypeToShow(chartTypeSelected);
  };

  return (
    <div>
      <div className="mt-4">
        <h3>Evolución del número de turistas</h3>
        <div className="mt-3">
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
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

export default LineCharts;
