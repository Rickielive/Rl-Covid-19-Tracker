import React, { useEffect, useState } from "react";
import { line } from "react-chartjs-2";

function LineGraph() {
  const [data, setData] = useState({});

  //https://disease.sh/v3/covid-19/historical/all?lastdays=120

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
      .then((response) => response.json())
      .then((data) => {
        //All the clever stuff come here

        console.log(data);
      });
  }, []);

  const buildChartData = (data) => {
    const chartData = [];
    let lastDataPoint;

    data.cases.forEach((date) => {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data["cases"][date] - lastDataPoint,
        };
      }
    });
  };

  return (
    <div>
      {/* <Line data options /> */}
      <h2>Im a graph</h2>
    </div>
  );
}

export default LineGraph;
