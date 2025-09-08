"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import type { TransactionCounts } from "@/types/transactions";

interface TransactionChartProps {
  data: TransactionCounts[];
}

const TransactionsChart = ({ data }: TransactionChartProps) => {
  return (
    <LineChart
      width={300}
      height={100}
      data={data}
      margin={{
        top: 20,
        right: 0,
        left: 0,
        bottom: -20,
      }}
    >
      <XAxis
        tick={false}
        dataKey="name"
        color="white"
        tickLine={false}
        axisLine={{ stroke: "white" }}
      />
      <YAxis
        dataKey="count"
        domain={[(dataMin) => Math.round(dataMin * 0.9), "dataMax"]}
        tick={{
          stroke: "white",
          fontSize: 10,
        }}
        tickLine={false}
        axisLine={{ stroke: "white" }}
        interval={1}
      />
      <Tooltip
        contentStyle={{ backgroundColor: "#000" }}
        formatter={(value, name) => {
          if (name === "count") {
            return [value, "Txn Count"];
          }
          return [value, "Blocks"];
        }}
      />
      <Line type="monotone" dot={false} dataKey="count" stroke="#82ca9d" />
    </LineChart>
  );
};

export default TransactionsChart;
