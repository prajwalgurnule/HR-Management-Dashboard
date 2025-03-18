import React from "react";
import ReactApexChart from "react-apexcharts";

export const ApexCharts = ({ seriesData, options }) => {
  const defaultOptions = {
    chart: {
      type: "line",
      stacked: false,
      toolbar: { show: false },
    },
    stroke: {
      width: [0, 2, 5],
      curve: "smooth",
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
      },
    },
    fill: {
      opacity: [0.85, 0.25, 1],
      gradient: {
        inverseColors: false,
        shade: "light",
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100],
      },
    },
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    markers: {
      size: 4,
    },
    xaxis: {
      title: { text: "" },
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ],
      labels: {
        style: { fontSize: "12px", fontWeight: "bold" },
      },
    },
    yaxis: {
      title: { text: "Applications" },
      min: 0,
      labels: {
        formatter: (value) => value.toLocaleString(),
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => (y ? y.toLocaleString() + " applications" : "0"),
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
      labels: {
        useSeriesColors: true,
      },
    },
  };

  return (
    <ReactApexChart
      height={350} // Set a reasonable height
      options={{ ...defaultOptions, ...options }}
      series={seriesData}
      type="line"
    />
  );
};
