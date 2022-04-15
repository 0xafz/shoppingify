import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts"

const BarShape = ({
  name,
  x,
  y,
  width,
  height,
  fill,
  background,
  value,
}: any) => {
  return (
    <g
      fontSize={background.width < 268 ? "1.4rem" : "1.8rem"}
      fontWeight={"500"}
    >
      <text x={5} y={y - 20}>
        {name}
      </text>
      <text y={y - 20} x={background.width - 30}>
        {value}%
      </text>
      <rect
        rx={5}
        fill={"var(--clr-gray7)"}
        height={background.width < 268 ? 5 : height}
        width={background.width}
        x={background.x}
        y={y}
      ></rect>
      <rect
        fill={fill}
        x={x}
        y={y}
        width={width}
        height={background.width < 268 ? 5 : height}
        rx={5}
        name={name}
      ></rect>
    </g>
  )
}
interface C_BarChartProps {
  data: Array<{ [key: string]: any }>
  dataKey?: string
  xAxisDataKey: string
  yAxisDataKey: string
  width?: number
  height?: number
  barSize?: number
  fill?: string
}
const C_BarChart = ({
  data,
  dataKey,
  xAxisDataKey,
  yAxisDataKey,
  barSize = 10,
  fill = "var(--clr-amber10)",
}: C_BarChartProps) => {
  return (
    <ResponsiveContainer width={"99%"} height="69%">
      <ReBarChart data={data} layout="vertical">
        <XAxis dataKey={xAxisDataKey} type="number" domain={[0, 100]} hide />
        <YAxis type="category" dataKey={yAxisDataKey} hide />
        <Bar
          dataKey={dataKey || xAxisDataKey}
          fill={fill}
          barSize={barSize}
          shape={<BarShape />}
        ></Bar>
      </ReBarChart>
    </ResponsiveContainer>
  )
}
export default C_BarChart
