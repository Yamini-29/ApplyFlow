import { LayoutDashboard, Briefcase, Kanban } from "lucide-react"
import Link from "next/link"

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-black border-r border-neutral-800 p-6">

      <h1 className="text-2xl font-bold text-orange-500 mb-10">
        ApplyFlow
      </h1>

      <nav className="space-y-3">

        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-900"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link
          href="/applications"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-900"
        >
          <Briefcase size={18} />
          Applications
        </Link>

        <Link
          href="/kanban"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-900"
        >
          <Kanban size={18} />
          Kanban
        </Link>

        <Link
          href="/yet-to-apply"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-900"
        >
          <Briefcase size={18} />
          Yet To Apply
        </Link>

      </nav>

    </div>
  )
}