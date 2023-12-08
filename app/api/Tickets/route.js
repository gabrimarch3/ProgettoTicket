import Ticket from "@/app/(models)/Ticket.js";
import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("POST RUN");
  try {
    const body = await req.json();
    console.log("Request Body:", body);
    const ticketData = body.formData;
    await Ticket.create(ticketData);
    return NextResponse.json({ message: "Ticket Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const tickets = await Ticket.find();
    return NextResponse.json({ tickets }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
