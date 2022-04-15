import React, { useMemo } from "react"
import Layout from "~/components/Layout"
import dynamic from "next/dynamic"
import C_LineChart from "~/components/charts/C_LineChart"
import C_BarChart from "~/components/charts/C_BarChart"

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
// use normalized
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

// const C_BarChart = dynamic(() => import("~/components/charts/C_BarChart"), {
//   ssr: false,
// })

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
      <div className="wrapper styled-scrollbars">
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
          <C_LineChart
            data={totalItemsPerMonth}
            dataKey="quantity"
            xAxisDataKey="month"
          />
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          padding: 4rem 6rem 6rem;
          box-sizing: border-box;
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
          height: 40vh;
          gap: 5rem;
          overflow: hidden;
        }
        .chart-1,
        .chart-2 {
          flex-basis: 50%;
        }
        .line-chart {
          margin-top: 2rem;
          height: 40vh;
          width: 100%;
        }
        .line-chart div {
          height: 100%;
        }
        @media (max-width: 1024px) {
          .wrapper {
            padding: 1rem;
          }
          h2 {
            font-size: 1.8rem;
            line-height: 2rem;
          }
          @media (max-width: 768px) {
            .bar-charts {
              flex-direction: column;
              height: 90vh;
              gap: 0rem;
            }
          }
        }
      `}</style>
    </Layout>
  )
}

export default Stats
