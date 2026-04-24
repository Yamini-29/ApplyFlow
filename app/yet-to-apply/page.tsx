"use client"

import { useEffect, useState } from "react"
import AppLayout from "@/components/layout/AppLayout"
import AddYetToApplyModal from "@/components/yettoapply/AddYetToApplyModal"
import { MoreHorizontal } from "lucide-react"

export default function YetToApplyPage() {

  const [items, setItems] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [openMenu,setOpenMenu]=useState<string|null>(null)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    const res = await fetch("/api/yettoapply")
    const data = await res.json()
    setItems(data)
  }
  const deleteYetToApply = async (id: string) => {
  await fetch(`/api/yettoapply/${id}`, {
    method: "DELETE"
  })
  fetchItems()
}

const moveToApplications = async (item: any) => {

  await fetch("/api/applications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      company: item.company,
      role: item.role,
      status: "Applied",
      jobLink: item.jobLink
    })
  })

  await fetch(`/api/yettoapply/${item._id}`, {
    method: "DELETE"
  })

  fetchItems()
}
  return (

    <AppLayout>

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-semibold">
          Yet To Apply
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-sm font-medium"
        >
          + Add Yet To Apply
        </button>

      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

        {items.map((item: any) => (

          <div
key={item._id}
className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:bg-neutral-800 transition shadow relative"
>

<div className="flex justify-between items-start">

<div>

<p className="font-medium text-lg">
{item.company}
</p>

<p className="text-sm text-neutral-400">
{item.role}
</p>

</div>

<button
onClick={()=>setOpenMenu(openMenu===item._id?null:item._id)}
className="p-2 hover:bg-neutral-700 rounded"
>
<MoreHorizontal size={18}/>
</button>

</div>

<span className="text-xs px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 mt-2 inline-block">
{item.stage}
</span>

{item.referralName && (

<p className="text-sm text-neutral-400 mt-3">
Referral: {item.referralName}
</p>

)}

{item.reminderDate && (

<div className="mt-3 text-xs text-neutral-400">

<p className="uppercase text-neutral-500">
Follow-up Reminder
</p>

<p>
{new Date(item.reminderDate).toLocaleDateString()}
</p>

</div>

)}

{/* Action Menu */}

{openMenu===item._id && (

<div className="absolute right-4 top-12 w-40 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl z-50">

<button
onClick={()=>setEditingApp(item)}
className="block w-full text-left px-4 py-2 hover:bg-neutral-800"
>
Edit
</button>

<button onClick={()=>deleteYetToApply(item._id)}>
Delete
</button>

<button onClick={()=>moveToApplications(item)}>
Move to Applications
</button>

</div>

)}

</div>

        ))}

      </div>

      {/* Modal */}

      {showModal && (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <AddYetToApplyModal
            refresh={fetchItems}
            close={() => setShowModal(false)}
          />

        </div>

      )}

    </AppLayout>

  )

}