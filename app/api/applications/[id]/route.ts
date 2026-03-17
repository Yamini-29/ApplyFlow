import { connectDB } from "@/lib/mongodb"
import Application from "@/models/Application"
import { NextResponse } from "next/server"

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB()

  const { id } = await context.params
  const body = await req.json()

  const updatedApplication = await Application.findByIdAndUpdate(
    id,
    body,
    { returnDocument: "after" }
  )

  return NextResponse.json(updatedApplication)
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB()

  const { id } = await context.params

  await Application.findByIdAndDelete(id)

  return NextResponse.json({ success: true })
}