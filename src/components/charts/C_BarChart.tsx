import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts"

const CLabel = ({ value, name, y, background }: any) => {
  return (
    <g fontSize={"1.8rem"} fontWeight={"500"}>
      <text x={5} y={y - 20}>
        {name}
      </text>
      <text x={background.width - 40} y={y - 20}>
        {value}%
      </text>
    </g>
  )
}
const BarShape = ({ name, x, y, width, height, fill, background }: any) => {
  return (
    <g>
      <rect
        rx={5}
        fill={"var(--clr-gray7)"}
        height={height}
        width={background.width}
        x={background.x}
        y={y}
      ></rect>
      <rect
        fill={fill}
        x={x}
        y={y}
        width={width}
        height={height}
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
  width = 400,
  height = 300,
  barSize = 10,
  fill = "var(--clr-amber10)",
}: C_BarChartProps) => {
  return (
    <ResponsiveContainer width={"100%"} height="100%">
      <ReBarChart data={data} layout="vertical">
        <XAxis dataKey={xAxisDataKey} type="number" domain={[0, 100]} hide />
        <YAxis type="category" dataKey={yAxisDataKey} hide />
        <Bar
          dataKey={dataKey || xAxisDataKey}
          fill={fill}
          barSize={barSize}
          label={<CLabel background={{ width, height }} />}
          shape={<BarShape />}
        ></Bar>
      </ReBarChart>
    </ResponsiveContainer>
  )
}
export default C_BarChart
