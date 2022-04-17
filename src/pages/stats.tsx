import React, { useEffect, useMemo } from "react"
import Layout from "~/components/Layout"
import C_LineChart from "~/components/charts/C_LineChart"
import C_BarChart from "~/components/charts/C_BarChart"
import { useStore } from "~/zustand"

interface StatsProps {}

const Stats: React.FC<StatsProps> = ({}) => {
  const fetchStats = useStore((state) => state.fetchStats)
  useEffect(() => {
    fetchStats()
  }, [])
  const stats = useStore((state) => state.stats)
  const topItemsNormalized = useMemo(() => {
    if (!stats.byItem) return []
    const total = stats.byItem.reduce((acc, curr) => acc + curr.quantity, 0)

    return stats.byItem.map((item) => ({
      ...item,
      percent: Math.round((item.quantity * 100) / total),
    }))
  }, [stats])
  const topCategoriesNormalized = useMemo(() => {
    // if (!stats.byCategory) return []
    const total = stats.byCategory.reduce((acc, curr) => acc + curr.quantity, 0)

    return stats.byCategory.map((item) => ({
      ...item,
      percent: Math.round((item.quantity * 100) / total),
    }))
  }, [stats])
  return (
    <Layout>
      <div className="wrapper styled-scrollbars">
        <div className="bar-charts">
          <div className="chart-1">
            <h2>Top items</h2>
            <C_BarChart
              data={topItemsNormalized}
              xAxisDataKey="percent"
              yAxisDataKey="itemName"
            />
          </div>
          <div className="chart-2">
            <h2>Top Categories</h2>
            <C_BarChart
              data={topCategoriesNormalized}
              xAxisDataKey="percent"
              yAxisDataKey="categoryName"
              fill="var(--clr-sky10)"
            />
          </div>
        </div>
        <div className="line-chart">
          <h2>Yearly Summary</h2>
          <C_LineChart
            data={stats.byMonth}
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
