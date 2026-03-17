import Sidebar from "./Sidebar"
import Navbar from "./Navbar"

export default function AppLayout({ children }) {

  return (

<div className="flex min-h-screen">

<Sidebar/>

<div className="flex-1 flex flex-col">

<Navbar/>

<div className="p-8">
{children}
</div>

</div>

</div>

  )
}