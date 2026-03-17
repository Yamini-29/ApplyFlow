import { connectDB } from "@/lib/mongodb";
import Application from "@/models/Application";
import { NextResponse } from "next/server";



export async function GET() {
  try {
    await connectDB();

    const applications = await Application.find();

    return NextResponse.json(applications);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    console.log("Connecting to DB...");

    await connectDB();

    console.log("Reading request body...");

    const body = await req.json();

    console.log("Body:", body);

    const application = await Application.create(body);

    console.log("Saved:", application);

    return NextResponse.json(application);

  } catch (error) {

    console.error("ERROR:", error);

    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}