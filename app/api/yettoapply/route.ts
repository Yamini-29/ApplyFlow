import { connectDB } from "@/lib/mongodb"
import YetToApply from "@/models/YetToApply"
import { NextResponse } from "next/server"

export async function GET(){

await connectDB()

const data = await YetToApply.find()

return NextResponse.json(data)

}

export async function POST(req:Request){

await connectDB()

const body = await req.json()

const item = await YetToApply.create(body)

return NextResponse.json(item)

}