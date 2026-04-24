// components/dashboard/ApplicationChart.tsx

"use client"

import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"

export default function ApplicationChart() {

  const [data, setData] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const res = await fetch("/api/applications")
    const apps = await res.json()

    const grouped: any = {}

    apps.forEach((app: any) => {
      const date = new Date(app.appliedDate)
        .toLocaleDateString()

      grouped[date] = (grouped[date] || 0) + 1
    })

    const formatted = Object.keys(grouped).map((date) => ({
      date,
      count: grouped[date]
    }))

    setData(formatted)
  }

  return (

    <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 mt-10">

      <h2 className="text-lg mb-4">
        Applications Over Time
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <LineChart data={data}>

          <XAxis dataKey="date" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="count"
            stroke="#f97316"
            strokeWidth={2}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  )
}