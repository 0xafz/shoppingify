import React from "react"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"

const totalItemsPerMonth = [
  {
    month: "January",
    quantity: 100,
  },
  {
    month: "Febraury",
    quantity: 102,
  },
  {
    month: "March",
    quantity: 15,
  },
  {
    month: "April",
    quantity: 45,
  },
  {
    month: "May",
    quantity: 5,
  },
  {
    month: "June",
    quantity: 89,
  },
  {
    month: "July",
    quantity: 77,
  },
  {
    month: "July",
    quantity: 77,
  },
  {
    month: "July",
    quantity: 77,
  },
  {
    month: "July",
    quantity: 77,
  },
  {
    month: "July",
    quantity: 77,
  },
  {
    month: "July",
    quantity: 77,
  },
  {
    month: "July",
    quantity: 77,
  },
]
interface C_LineChartProps {}

const C_LineChart: React.FC<C_LineChartProps> = ({}) => {
  return (
    <ResponsiveContainer width={"100%"} height="100%">
      <LineChart
        // width={1000}
        // height={400}
        data={totalItemsPerMonth}
        margin={{ left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          type="category"
          fontSize={"1.5rem"}
          fontWeight="500"
        />
        <YAxis fontSize={"1.8rem"} fontWeight="500" />
        <Line type="monotone" dataKey="quantity" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default C_LineChart
