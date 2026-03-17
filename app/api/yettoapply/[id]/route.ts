import { connectDB } from "@/lib/mongodb"
import YetToApply from "@/models/YetToApply"
import { NextResponse } from "next/server"

export async function DELETE(
req:Request,
context:{params:Promise<{id:string}>}
){

await connectDB()

const {id}=await context.params

await YetToApply.findByIdAndDelete(id)

return NextResponse.json({success:true})

}