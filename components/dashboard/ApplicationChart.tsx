"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"

const data = [
  { month: "Jan", applications: 5 },
  { month: "Feb", applications: 8 },
  { month: "Mar", applications: 12 }
]

export default function ApplicationChart() {
  return (
    <div className="bg-neutral-900 p-6 rounded-xl mt-10 w-full">

      <h2 className="text-lg font-semibold mb-4">
        Applications per Month
      </h2>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="applications" fill="#f97316" />
        </BarChart>
      </ResponsiveContainer>

    </div>
  )
}