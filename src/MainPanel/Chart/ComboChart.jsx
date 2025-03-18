import React from "react";
import ReactApexChart from "react-apexcharts";

const ComboChart = ({ seriesData }) => {
  const options = {
    chart: {
      type: "line",
      stacked: false,
      toolbar: { show: false },
    },
    stroke: {
      width: [0, 2],
      curve: "smooth",
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
      },
    },
    fill: {
      opacity: [0.85, 0.5],
    },
    xaxis: {
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ],
      title: {
        text: "Months",
      },
      min: 0,
    },
    yaxis: {
      title: {
        text: "Applications",
      },
      min: 0,
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    legend: {
      show: true,
      position: "top",
    },
  };

  return (
    <div className="combo-chart-container">
      <ReactApexChart options={options} series={seriesData} type="line" height={350} />
    </div>
  );
};

export default ComboChart;
