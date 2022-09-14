import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import { useState, useEffect } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  // const [coinPrice, setCoinPrice] = useState([]);
  // const [coinTimestamp, setCoinTimestamp] = useState([]);

  const coinPrice = [];
  const coinTimestamp = [];

  // useEffect(() => {
  //   const cp = coinHistory?.data?.history?.map((item) => item.price);
  //   const ep = coinHistory?.data.history?.map((item) =>
  //     new Date(item.timestamp).toLocaleDateString()
  //   );
  //   setCoinPrice(cp);
  //   setCoinTimestamp(ep);
  // }, coinHistory);

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    coinTimestamp.push(
      new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString()
    );
  }
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  console.log(coinHistory, "coinHistory");
  console.log(coinPrice, "Price");
  console.log(coinTimestamp, "TimeStamp");
  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart{" "}
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
