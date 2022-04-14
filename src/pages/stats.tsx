import React, { useMemo } from "react"
import Layout from "~/components/Layout"
import dynamic from "next/dynamic"
import C_LineChart from "~/components/charts/C_LineChart"

const topItems = [
  { name: "Banana", quantity: 60 },
  { name: "Rice", quantity: 20 },
  { name: "Chicken", quantity: 200 },
]
const topCategories = [
  { name: "Fruit and veggies", quantity: 90 },
  { name: "Meat and Fish", quantity: 75 },
  { name: "Random", quantity: 100 },
]

const C_BarChart = dynamic(() => import("~/components/charts/C_BarChart"), {
  ssr: false,
})

interface StatsProps {}

const Stats: React.FC<StatsProps> = ({}) => {
  const topItemsNormalized = useMemo(() => {
    const total = topItems.reduce((acc, curr) => acc + curr.quantity, 0)

    return topItems.map((item) => ({
      ...item,
      percent: Math.round((item.quantity * 100) / total),
    }))
  }, [topItems])
  const topCategoriesNormalized = useMemo(() => {
    const total = topCategories.reduce((acc, curr) => acc + curr.quantity, 0)

    return topCategories.map((item) => ({
      ...item,
      percent: Math.round((item.quantity * 100) / total),
    }))
  }, [topCategories])
  return (
    <Layout>
      <div className="wrapper">
        <div className="bar-charts">
          <div className="chart-1">
            <h2>Top items</h2>
            <C_BarChart
              data={topItemsNormalized}
              xAxisDataKey="percent"
              yAxisDataKey="name"
            />
          </div>
          <div className="chart-2">
            <h2>Top Categories</h2>
            <C_BarChart
              data={topCategoriesNormalized}
              xAxisDataKey="percent"
              yAxisDataKey="name"
              fill="var(--clr-sky10)"
            />
          </div>
        </div>
        <div className="line-chart">
          <h2>Yearly Summary</h2>
          <C_LineChart />
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          padding: 4rem 6rem 6rem;
        }
        h2 {
          font-size: 2.4rem;
          line-height: 3rem;
          font-weight: 500;
          margin: 4rem 0;
        }
        .bar-charts {
          display: flex;
          width: 100%;
          height: 40rem;
          gap: 5rem;
        }
        .chart-1,
        .chart-2 {
          flex-grow: 1;
        }
        .line-chart {
          height: 40rem;
          width: 100%;
          padding-top: 4rem;
        }
      `}</style>
    </Layout>
  )
}

export default Stats
