import React from "react";
import { Line } from "@ant-design/charts";

export default function CustomChart({ data }) {
  const config = {
    data,
    width: 600,
    height: 400,
    autoFit: false,
    xField: "email",
    yField: "firstName",
    point: {
      size: 5,
      shape: "diamond",
    },
    label: {
      style: {
        fill: "#aaa",
      },
    },
  };

  return (
    <div>
      <Line {...config} />
    </div>
  );
}
