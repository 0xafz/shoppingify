import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  LineProps,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface C_LineChartProps {
  data: Array<{ [key: string]: any }>;
  dataKey: string;
  xAxisDataKey: string;
  yAxisDataKey?: string;
  stroke?: string;
  xAxisType?: "category" | "number";
  lineType?: LineProps["type"];
}

const C_LineChart: React.FC<C_LineChartProps> = ({
  xAxisDataKey,
  dataKey,
  yAxisDataKey,
  stroke = "#8884d8",
  xAxisType = "category",
  lineType = "monotone",
  data,
}) => {
  return (
    <ResponsiveContainer width={"100%"} height="69%">
      <LineChart data={data} margin={{ left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={xAxisDataKey}
          type={xAxisType}
          fontWeight="500"
          fontSize={"1.4rem"}
        />
        <YAxis
          fontWeight="500"
          width={30}
          fontSize="1.5rem"
          dataKey={yAxisDataKey}
        />
        <Line type={lineType} dataKey={dataKey} stroke={stroke} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default C_LineChart;
