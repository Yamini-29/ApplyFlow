import ApplicationsTable from "@/components/applications/ApplicationsTable"
import AddApplicationModal from "@/components/applications/AddApplicationModal"
import AppLayout from "@/components/layout/AppLayout"


export default function ApplicationsPage(){

  return(
    <AppLayout>

<div className="p-8">

<div className="flex justify-between items-center mb-6">

<h1 className="text-3xl font-bold">
Applications
</h1>


</div>

<ApplicationsTable/>

</div>

</AppLayout>
  )
}