"use client"

import { useEffect, useState } from "react"
import { MoreHorizontal } from "lucide-react"
import EditApplicationModal from "./EditApplicationModal"

type Application = {
  _id: string
  company: string
  role: string
  status: string
  jobLink: string
}

export default function ApplicationsTable() {

  const [applications, setApplications] = useState<Application[]>([])
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [editingApp,setEditingApp] = useState<any>(null)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    const res = await fetch("/api/applications")
    const data = await res.json()
    setApplications(data)
  }

  const updateStatus = async (id: string, status: string) => {

    await fetch(`/api/applications/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status })
    })

    fetchApplications()
    setOpenMenu(null)
  }

const deleteApplication = async(id:string)=>{

  if(!confirm("Delete this application?")) return

  await fetch(`/api/applications/${id}`,{
    method:"DELETE"
  })

  fetchApplications()
}
  const getStatusStyle = (status: string) => {

    switch (status) {
      case "Applied":
        return "bg-gray-700 text-gray-200"

      case "OA":
        return "bg-blue-600 text-white"

      case "Interview":
        return "bg-purple-600 text-white"

      case "Offer":
        return "bg-green-600 text-white"

      case "Rejected":
        return "bg-red-600 text-white"

      default:
        return "bg-neutral-700"
    }
  }

  return (

    <div className="mt-10 w-full">

      {/* Search + Filter */}

      <div className="flex gap-5 mb-6">

        <input
          placeholder="Search company..."
          className="bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-lg"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All</option>
          <option>Applied</option>
          <option>OA</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>

      </div>

      {/* Table */}

<div className="border border-neutral-800 rounded-xl overflow-visible">
        <table className="w-full">

          <thead className="bg-neutral-900 text-neutral-400 text-sm">
            <tr>
              <th className="p-5 text-left">Company</th>
              <th className="p-5 text-left">Role</th>
              <th className="p-5 text-left">Status</th>
              <th className="p-5 text-left">Job Link</th>
              <th className="p-5 text-left w-10"></th>
            </tr>
          </thead>

          <tbody>

            {applications
              .filter((app) =>
                app.company.toLowerCase().includes(search.toLowerCase())
              )
              .filter((app) =>
                statusFilter === "All" ? true : app.status === statusFilter
              )
              .map((app) => (

                <tr
                  key={app._id}
                  className="border-t border-neutral-800 hover:bg-neutral-900 group transition"
                >

                  <td className="p-5">{app.company}</td>

                  <td className="p-5">{app.role}</td>
                  <td>
  <a href={app.jobLink} target="_blank" className="text-blue-400">
    View
  </a>
</td>

                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(app.status)}`}>
                      {app.status}
                    </span>
                  </td>

<td className="p-5 relative">

<button
  onClick={() =>
    setOpenMenu(openMenu === app._id ? null : app._id)
  }
  className="p-1 hover:bg-neutral-800 rounded"
>
  <MoreHorizontal size={18}/>
</button>

{openMenu === app._id && (

<div className="absolute right-0 top-10 w-36 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl z-50">

<button
  onClick={()=>setEditingApp(app)}
  className="block w-full text-left px-4 py-2 hover:bg-neutral-800"
>
Edit
</button>

<button
  onClick={()=>deleteApplication(app._id)}
  className="block w-full text-left px-4 py-2 hover:bg-neutral-800 text-red-400"
>
Delete
</button>

</div>

)}

</td>

                </tr>

              ))}

          </tbody>

        </table>

      </div>

      {/* Edit Application Modal */}
      {editingApp && (
        <EditApplicationModal
          app={editingApp}
          onClose={() => setEditingApp(null)}
          refresh={fetchApplications}
        />
      )}

    </div>

  )

}