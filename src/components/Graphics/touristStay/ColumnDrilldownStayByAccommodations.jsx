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
  "#c42525",
  "#0DAF12",
  "#8C1FA7",
  "#B8177D",
];

function compare(a, b) {
  if (
    a.accommodation === "Otros establecimientos colectivos" ||
    a.residencePlace === "Otros países"
  )
    return 1;
  if (a.averageStay > b.averageStay) return -1;
  if (a.averageStay < b.averageStay) return 1;

  return 0;
}

function ColumnDrilldownStayByAccommodations({ data }) {
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
            "downloadPNG",
            "downloadJPEG",
            "downloadPDF",
            "downloadSVG",
            "viewFullscreen",
            "printChart",
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
          stayByAccommodations: item.stayByAccommodations,
        };
      });

      const years = dataSelected.map((item) => item.year.toString());

      const firstYearAvailableData = years.indexOf("2018");

      const availableYears = years.slice(0, firstYearAvailableData + 1);

      setDataSelected(dataSelected);

      setYears(availableYears);

      setActiveYear(availableYears[0]);

      const firstData = dataSelected[1];

      const mainData = firstData.stayByAccommodations
        .sort(compare)
        .map((item, i) => {
          return {
            name: item.accommodation,
            y: item.averageStay,
            drilldown: item.accommodation,
            color: COLORS[i],
          };
        });

      const secondaryData = firstData.stayByAccommodations.map((item) => {
        return {
          name: item.accommodation,
          id: item.accommodation,
          data: item.accommodationStayByResidencePlace
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
          text: `Estancia media por alojamiento en ${years[0]}`,
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
    const mainData = dataSelected[indexActualYear].stayByAccommodations
      .sort(compare)
      .map((element) => {
        return {
          name: element.accommodation,
          y: element.averageStay,
          drilldown: element.accommodation,
        };
      });

    const secondaryData = dataSelected[
      indexActualYear
    ].stayByAccommodations.map((element) => {
      return {
        name: element.accommodation,
        id: element.accommodation,
        data: element.accommodationStayByResidencePlace
          .sort(compare)
          .map((residencePlace) => {
            return [residencePlace.residencePlace, residencePlace.averageStay];
          }),
      };
    });

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
        <h3>Estancia media por alojamiento</h3>
        <div className="mt-4">
          <p>DECIR QUE SE ORDENAN DE MAYOR A MENOR AUTOMATICAMENTE</p>
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

export default ColumnDrilldownStayByAccommodations;
