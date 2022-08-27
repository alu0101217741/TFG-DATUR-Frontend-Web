import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import drilldown from "highcharts/modules/drilldown";
import exportdata from "highcharts/modules/export-data";
import exporting from "highcharts/modules/exporting";
import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

drilldown(Highcharts);
exporting(Highcharts);
exportdata(Highcharts);

const COLORS = [
  "#2f7ed8",
  "#f28f43",
  "#492970",
  "#B52323",
  "#10A615",
  "#8C1FA7",
  "#1CB4B6",
];

function compare(a, b) {
  if (b.residencePlace === "Otros países") return -1;
  if (a.averageStay > b.averageStay) return -1;
  if (a.averageStay < b.averageStay) return 1;

  return 0;
}

function ColumnDrilldownStayByIslandChart({ data }) {
  const [dataSelected, setDataSelected] = useState([]);
  const [years, setYears] = useState([]);
  const [activeYear, setActiveYear] = useState();
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "column",
      shadow: true,
    },
    title: {
      align: "center",
    },
    subtitle: {
      align: "center",
      text: "Pulsa sobre las columnas para obtener más información.",
    },
    accessibility: {
      announceNewData: {
        enabled: true,
      },
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      title: {
        text: "Días",
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: "{point.y} días",
        },
      },
      column: {
        borderRadius: 5,
      },
    },

    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat:
        '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> días<br/>',
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
    drilldown: {
      breadcrumbs: {
        position: {
          align: "right",
        },
      },
    },
    series: [
      {
        name: "Islas",
        colorByPoint: true,
      },
    ],
  });

  useEffect(() => {
    if (data.length > 0) {
      const dataSelected = data.map((item) => {
        return {
          year: item.year,
          stayByIsland: item.stayByIsland,
        };
      });

      const years = dataSelected.map((item) => item.year.toString());

      setDataSelected(dataSelected);

      setYears(years);

      setActiveYear(years[0]);

      const firstData = dataSelected[0];

      const mainData = firstData.stayByIsland.sort(compare).map((item, i) => {
        return {
          name: item.island,
          y: item.averageStay,
          drilldown: item.island,
          color: COLORS[i],
        };
      });

      const secondaryData = firstData.stayByIsland.map((item) => {
        return {
          name: item.island,
          id: item.island,
          data: item.islandStayByResidencePlaces
            .sort(compare)
            .map((residencePlace) => {
              return [
                residencePlace.residencePlace,
                residencePlace.averageStay,
              ];
            }),
        };
      });

      setChartOptions({
        title: {
          text: `Estancia media por isla en ${years[0]}`,
        },
        series: [
          {
            data: mainData,
          },
        ],
        drilldown: {
          series: secondaryData,
        },
      });
    }
  }, [data]);

  const handleSelect = (year) => {
    setActiveYear(year);

    const indexActualYear = years.indexOf(year);

    const mainData = dataSelected[indexActualYear].stayByIsland
      .sort(compare)
      .map((element) => {
        return {
          name: element.island,
          y: element.averageStay,
          drilldown: element.island,
        };
      });

    const secondaryData = dataSelected[indexActualYear].stayByIsland.map(
      (element) => {
        return {
          name: element.island,
          id: element.island,
          data: element.islandStayByResidencePlaces
            .sort(compare)
            .map((residencePlace) => {
              return [
                residencePlace.residencePlace,
                residencePlace.averageStay,
              ];
            }),
        };
      }
    );

    setChartOptions({
      title: {
        text: `Estancia media por isla en ${year}`,
      },
      series: [
        {
          data: mainData,
        },
      ],
      drilldown: {
        series: secondaryData,
      },
    });
  };

  return (
    <div>
      <div className="mt-4">
        <h3>Estancia media según isla visitada</h3>
        <div className="mt-3">
          <p>
            En esta gráfica se incluye información de la estancia media según la
            isla de alojamiento. Además, pulsando sobre las columnas, se puede
            conocer la estancia media de las principales nacionalidades en la
            isla seleccionada.
          </p>
          <DropdownButton
            title={"Año: " + activeYear}
            onSelect={handleSelect}
            className="dropdown-button-center"
          >
            {years.map((year) => (
              <Dropdown.Item eventKey={year}>{year}</Dropdown.Item>
            ))}
          </DropdownButton>
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

export default ColumnDrilldownStayByIslandChart;
