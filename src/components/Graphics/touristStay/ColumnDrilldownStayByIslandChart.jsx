import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import drilldown from "highcharts/modules/drilldown";
import exportdata from "highcharts/modules/export-data";
import exporting from "highcharts/modules/exporting";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

drilldown(Highcharts);
exporting(Highcharts);
exportdata(Highcharts);

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
    },

    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat:
        '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
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

    const firstData = dataSelected.slice(0, 1).flat();

    const mainData = firstData.map((item) => {
      return item.stayByIsland.map((element) => {
        return {
          name: element.island,
          y: element.averageStay,
          drilldown: element.island,
        };
      });
    });

    const secondaryData = firstData.map((item) => {
      return item.stayByIsland.map((element) => {
        return {
          name: element.island,
          id: element.island,
          data: element.islandStayByResidencePlaces.map((residencePlace) => {
            return [residencePlace.residencePlace, residencePlace.averageStay];
          }),
        };
      });
    });

    setChartOptions({
      title: {
        text: `Estancia media por isla en ${years[0]}`,
      },
      series: [
        {
          data: mainData[0],
        },
      ],
      drilldown: {
        series: secondaryData[0],
      },
    });
  }, [data]);

  const handleSelect = (year) => {
    setActiveYear(year);

    const indexActualYear = years.indexOf(year);
    const indexPreviousYear = indexActualYear + 1;

    const mainData = dataSelected[indexActualYear].stayByIsland.map(
      (element) => {
        return {
          name: element.island,
          y: element.averageStay,
          drilldown: element.island,
        };
      }
    );

    const secondaryData = dataSelected[indexPreviousYear].stayByIsland.map(
      (element) => {
        return {
          name: element.island,
          id: element.island,
          data: element.islandStayByResidencePlaces.map((residencePlace) => {
            return [residencePlace.residencePlace, residencePlace.averageStay];
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
      <Container className="mt-4">
        <h3>Estancia media por isla</h3>
        <Container>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <DropdownButton
            alignRight
            title={activeYear}
            id="dropdown-menu-align-left"
            onSelect={handleSelect}
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

export default ColumnDrilldownStayByIslandChart;