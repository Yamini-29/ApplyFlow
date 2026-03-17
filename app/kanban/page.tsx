"use client"

import { useEffect, useState } from "react"
import {
  DndContext,
  closestCorners,
  useDraggable,
  useDroppable
} from "@dnd-kit/core"
import AppLayout from "@/components/layout/AppLayout"

type Application = {
  _id: string
  company: string
  role: string
  status: string
}

const statuses = [
"Yet To Apply",
"Applied",
"OA",
"Interview",
"Offer",
"Rejected"
]

export default function KanbanPage() {

  const [applications, setApplications] = useState<Application[]>([])

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
  }

  const handleDragEnd = (event: any) => {

    const { active, over } = event

    if (!over) return

    const id = active.id
    const newStatus = over.id

    updateStatus(id, newStatus)
  }

  return (
    <AppLayout>

    <div className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        Application Pipeline
      </h1>

      <DndContext
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >

        <div className="grid grid-cols-5 gap-6">

          {statuses.map((status) => {

            const columnApps = applications.filter(
              (app) => app.status === status
            )

            return (

              <Column
                key={status}
                status={status}
                apps={columnApps}
              />

            )

          })}

        </div>

      </DndContext>

    </div>
    </AppLayout>

  )
}

function Column({
  status,
  apps
}: {
  status: string
  apps: Application[]
}) {

  const { setNodeRef } = useDroppable({
    id: status
  })

  return (

    <div
      ref={setNodeRef}
      className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 min-h-[500px]"
    >

      <div className="flex justify-between items-center mb-4">

        <h2 className="font-semibold">
          {status}
        </h2>

        <span className="text-xs bg-neutral-800 px-2 py-1 rounded">
          {apps.length}
        </span>

      </div>

      {apps.map((app) => (
        <Card key={app._id} app={app} />
      ))}

    </div>

  )
}

function Card({ app }: { app: Application }) {

  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: app._id
    })

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`
      }
    : undefined

  return (

    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="bg-neutral-800 p-3 rounded-lg mb-3 cursor-grab hover:bg-neutral-700 shadow-md transition-transform duration-150"
    >

      <p className="font-medium">
        {app.company}
      </p>

      <p className="text-sm text-neutral-400">
        {app.role}
      </p>

    </div>

  )
}