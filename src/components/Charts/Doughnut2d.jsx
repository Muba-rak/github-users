import React from "react";
// Step 2 - Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";

// Step 4 - Include the chart type
import Chart from "fusioncharts/fusioncharts.charts";

// Step 5 - Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

// Step 6 - Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const Doughnut2d = ({ data }) => {
  const chartConfigs = {
    type: "doughnut2d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Stars per Language", //Set the chart caption
        theme: "candy", //Set the theme for your chart
        decimals: 0,
        doughnutRadius: "45%",
        showPercentValues: 0,
      },
      // Chart Data - from step 2
      data,
    },
  };
  return (
    <div>
      <ReactFC {...chartConfigs} />
    </div>
  );
};

export default Doughnut2d;
