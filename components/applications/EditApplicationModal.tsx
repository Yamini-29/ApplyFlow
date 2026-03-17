"use client"

import { useState } from "react"

export default function EditApplicationModal({
  app,
  onClose,
  refresh
}: any) {

  const [company, setCompany] = useState(app.company)
  const [role, setRole] = useState(app.role)
  const [status, setStatus] = useState(app.status)
  const [notes, setNotes] = useState(app.notes || "")

  const handleSave = async () => {

    await fetch(`/api/applications/${app._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        company,
        role,
        status,
        notes
      })
    })

    refresh()
    onClose()
  }

  return (

    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-neutral-900 p-6 rounded-xl w-[400px]">

        <h2 className="text-lg font-semibold mb-4">
          Edit Application
        </h2>

        <input
          value={company}
          onChange={(e)=>setCompany(e.target.value)}
          className="w-full mb-3 p-2 bg-neutral-800 rounded"
        />

        <input
          value={role}
          onChange={(e)=>setRole(e.target.value)}
          className="w-full mb-3 p-2 bg-neutral-800 rounded"
        />

        <select
          value={status}
          onChange={(e)=>setStatus(e.target.value)}
          className="w-full mb-3 p-2 bg-neutral-800 rounded"
        >
          <option>Applied</option>
          <option>OA</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>

        <textarea
          value={notes}
          onChange={(e)=>setNotes(e.target.value)}
          className="w-full mb-4 p-2 bg-neutral-800 rounded"
        />

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-3 py-2 bg-neutral-700 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-3 py-2 bg-orange-500 rounded"
          >
            Save
          </button>

        </div>

      </div>

    </div>

  )
}