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

function LineChart({ data }) {
  const [chartTypeToShow, setchartTypeToShow] = useState("líneas");

  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "line",
      shadow: true,
    },
    title: {
      text: "Evolución de la estancia media",
    },
    subtitle: {
      text: 'Fuente: <a target="_blank" href="http://www.gobiernodecanarias.org/istac/">Instituto Canario de Estadística</a>',
    },
    yAxis: {
      title: {
        text: "Días",
      },
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    tooltip: {
      valueSuffix: " días",
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
    const dataYears = data.reverse().map((item) => item.year);
    const dataValues = data.reverse().map((item) => item.averageStay);

    setChartOptions({
      xAxis: {
        categories: dataYears,
      },
      series: [
        {
          name: "Estancia media",
          data: dataValues,
          color: "#2f7ed8",
        },
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
        <h3>Evolución de la estancia media</h3>
        <div className="mt-3">
          <p>
            En esta gráfica se recoge la forma en la que ha evolucionado, a
            largo de los años, el número de días de media que pasan los turistas
            durante su estancia en el archipiélago.
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
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

export default LineChart;
