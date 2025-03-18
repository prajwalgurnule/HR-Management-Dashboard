import React from "react";
import ComboChart from "./ComboChart";
import { Card } from "react-bootstrap";

function ApplicationInfo() {
  const seriesData = [
    {
      name: "Received",
      type: "column",
      data: [
        2000, 3000, 4000, 2800, 3200, 1500, 3000, 2300, 4800, 1900, 2100, 3200,
      ],
      color: "#277ACC",
    },
    {
      name: "Processed",
      type: "line",
      data: [1500, 700, 2200, 1000, 1600, 750, 1900, 1100, 3200, 1300, 3000,2300],
      color: "rgba(0, 43, 85, 0.74)",
    },
  ];

  return (
    <Card className="p-4 shadow mb-4 assessment-info-container">
      <div className="d-flex justify-content-between align-items-center border-bottom border-2 pb-1 mb-3">
        <div className="d-flex gap-4 justify-content-center align-items-center">
          <h5 className="mb-0">Application’s Info</h5>
        </div>
        <button className="btn d-flex align-items-center justify-content-center p-2">
          <i className="bi bi-three-dots-vertical"></i>
        </button>
      </div>
      <ComboChart seriesData={seriesData} />
    </Card>
  );
}

export default ApplicationInfo;
