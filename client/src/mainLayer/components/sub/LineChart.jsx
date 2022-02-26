import React from "react";
import { Line } from "react-chartjs-2";

export default function LineChart({ coinHistory, currentPrice, coinName }) {
  const coinPrice = [];
  const coinTimestamp = [];
console.log(coinPrice);
console.log(coinTimestamp);
  //data maping
  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price); 
    coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#ffc30b",
        borderColor: "#666",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <div className="chart-header">
        <h3 className="chart-title">{coinName} Price Chart</h3>
        <div className="price-container">
          <p className="price-change">
            Change: <b>{coinHistory?.data?.change}%</b>
          </p>
          <p className="current-price">
            Current {coinName} Price: <b>$ {currentPrice}%</b>
          </p>
        </div>
      </div>
      <Line data={data} options={options} />
    </>
  );
}
