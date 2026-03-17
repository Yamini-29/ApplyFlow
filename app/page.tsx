"use client"

import MainLayout from "@/components/layout/MainLayout"
import ApplicationChart from "@/components/dashboard/ApplicationChart"
import { useEffect, useState } from "react"

export default function Dashboard() {

  const [stats, setStats] = useState({
    total: 0,
    oa: 0,
    interviews: 0,
    offers: 0
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    const res = await fetch("/api/applications")
    const data = await res.json()

    const total = data.length
    const oa = data.filter((a:any) => a.status === "OA").length
    const interviews = data.filter((a:any) => a.status === "Interview").length
    const offers = data.filter((a:any) => a.status === "Offer").length

    setStats({ total, oa, interviews, offers })
  }

  return (
 <div className="relative min-h-screen">

  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage: "url('/bg.png')"
    }}
  />

  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/10" />

  {/* Content */}
  <div className="relative z-10">

    <MainLayout>

      {/* Hero */}
      <div className="mb-10">

        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-orange-500 bg-clip-text text-transparent">
          Track your job applications before they disappear
        </h1>

        <p className="text-neutral-400 max-w-xl">
          Organize applications, track interviews, and manage your
          job search like a professional pipeline.
        </p>

      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">

        <StatCard title="Applications" value={stats.total} />
        <StatCard title="OA" value={stats.oa} />
        <StatCard title="Interviews" value={stats.interviews} />
        <StatCard title="Offers" value={stats.offers} />

      </div>

      <ApplicationChart />

    </MainLayout>
    </div>
 
</div>
  )
}

function StatCard({ title, value }: any) {
  return (
    <div className="relative bg-neutral-900 p-6 rounded-xl border border-neutral-800 overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-orange-500/10 blur-2xl"></div>

      <div className="relative">
        <p className="text-neutral-400">{title}</p>
        <h2 className="text-3xl font-bold mt-2">{value}</h2>
      </div>

    </div>
  )
}