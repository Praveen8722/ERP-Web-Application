import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

const OpenTaskBar = () => {
  const chartSetting = {
    yAxis: [
      {
        label: "Tasks",
        tickValues: [0, 5, 10, 15, 20], 
        tickCount: 5, 
        tickFormat: (value) => value, 
        grid: true, 
      },
    ],
    xAxis: [
      {
        scaleType: "band",
        dataKey: "label",
        tickPlacement: "middle",
        tickLabelPlacement: "middle",
        grid: true,
        tickLabelProps: () => ({
          style: { transform: "translateX(-10px)" },
        }),
      },
    ],
    height: 500,
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: "translateX(-10px)",
      },
    },
  };

  
  const series = [
    {
      data: [3, 4, 1, 6, 5, 7, 8, 2, 4, 6, 5, 3, 7, 4, 8, ],
      stack: "A",
      label: "Series A1",
    },
    {
      data: [4, 3, 1, 5, 8, 3, 7, 2, 5, 7, 6, 8, 2, 9, 4, ],
      stack: "A",
      label: "Series A2",
    },
    {
      data: [3, 4, 1, 6, 5, 4, 6, 1, 3, 5, 7, 2, 6, 5, 3, ],
      stack: "A",
      label: "Series A1",
    },
    {
      data: [4, 3, 1, 5, 8, 6, 5, 2, 4, 8, 3, 7, 4, 6, 5,],
      stack: "A",
      label: "Series A2",
    },
  ];


  const xLabels = [
    "Label 1",
    "Label 2",
    "Label 3",
    "Label 4",
    "Label 5",
    "Label 6",
    "Label 7",
    "Label 8",
    "Label 9",
    "Label 10",
    "Label 11",
    "Label 12",
    "Label 13",
    "Label 14",
    "Label 15",

  ];

  const dataset = xLabels.map((label, index) => ({
    label,
    seoul: series[0].data[index],
    tokyo: series[1].data[index],
    london: series[2].data[index],
  }));

  return (
    <div style={{ width: "100%" }}>
      <BarChart
        dataset={dataset}
        series={[
          { data: dataset.map((item) => item.seoul), stack: "A" },
          { data: dataset.map((item) => item.tokyo), stack: "A" },
          { data: dataset.map((item) => item.london), stack: "A" },
        ]}
        {...chartSetting}
      />
    </div>
  );
};

export default OpenTaskBar;
