"use client"

import { useState } from "react"

export default function AddYetToApplyModal({ refresh, close }: any){

const [company,setCompany]=useState("")
const [role,setRole]=useState("")
const [stage,setStage]=useState("Resume Editing")
const [referralName,setReferralName]=useState("")
const [referralContact,setReferralContact]=useState("")
const [reminderDate,setReminderDate]=useState("")
const [notes,setNotes]=useState("")

const save = async()=>{

await fetch("/api/yettoapply",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
company,
role,
stage,
referralName,
referralContact,
reminderDate,
notes
})
})

refresh()
close()
}

return(

<div className="bg-neutral-900 p-6 rounded-xl w-[400px]">

<h2 className="text-lg mb-4">
Add Yet To Apply
</h2>

<input
placeholder="Company"
value={company}
onChange={(e)=>setCompany(e.target.value)}
className="w-full mb-3 p-2 bg-neutral-800 rounded"
/>

<input
placeholder="Role"
value={role}
onChange={(e)=>setRole(e.target.value)}
className="w-full mb-3 p-2 bg-neutral-800 rounded"
/>

<select
value={stage}
onChange={(e)=>setStage(e.target.value)}
className="w-full mb-3 p-2 bg-neutral-800 rounded"
>

<option>Resume Editing</option>
<option>Looking Referral</option>
<option>Referral Requested</option>
<option>Waiting Referral Apply</option>
<option>Ready to Apply</option>

</select>

<input
placeholder="Referral Person Name"
value={referralName}
onChange={(e)=>setReferralName(e.target.value)}
className="w-full mb-3 p-2 bg-neutral-800 rounded"
/>

<input
placeholder="Referral Contact"
value={referralContact}
onChange={(e)=>setReferralContact(e.target.value)}
className="w-full mb-3 p-2 bg-neutral-800 rounded"
/>

<input
type="date"
value={reminderDate}
onChange={(e)=>setReminderDate(e.target.value)}
className="w-full mb-3 p-2 bg-neutral-800 rounded"
/>

<textarea
placeholder="Notes"
value={notes}
onChange={(e)=>setNotes(e.target.value)}
className="w-full mb-4 p-2 bg-neutral-800 rounded"
/>

<button
onClick={save}
className="bg-orange-500 px-4 py-2 rounded"
>
Save
</button>

</div>

)

}