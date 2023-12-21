import Ticket from "@/app/(models)/Ticket";
import { NextResponse } from "next/server";
import request from 'node-fetch';

export async function GET(req, { params }) {
  try {
    const { id } = params;

    // Check if ticket exists in local cache
    const cachedTicket = await Ticket.findOne({ _id: id });
    if (cachedTicket) {
      return NextResponse.json({ cachedTicket }, { status: 200 });
    }

    // Retrieve ticket from data source
    const url = 'https://progetto-ticket-dou6.vercel.app/tickets/' + id;
    const response = await request(url);
    const data = await response.json();

    // Update local cache with retrieved ticket data
    if (data) {
      await Ticket.findByIdAndUpdate(id, data);
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    if (error.statusCode === 404 || error.name === 'NotFoundError') {
      return NextResponse.json({ message: "Ticket not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Error retrieving ticket", error }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    // Delete ticket from local cache
    await Ticket.findByIdAndDelete(id);

    // Delete ticket from data source
    const url = 'https://progetto-ticket-dou6.vercel.app/tickets/' + id;
    const response = await request.delete(url);

    if (response.statusCode !== 204) {
      throw new Error('Failed to delete ticket from data source');
    }

    return NextResponse.json({ message: "Ticket deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting ticket", error }, { status: 500 });
  }
}


export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const ticketData = body.formData;

    // Update ticket in local cache
    const updatedTicket = await Ticket.findByIdAndUpdate(id, { ...ticketData });

    // Update ticket in data source
    const url = 'https://your-data-source.com/tickets/' + id;
    const updatedData = { ...ticketData };
    const response = await request.put(url, updatedData);

    if (response.statusCode !== 200) {
      throw new Error('Failed to update ticket in data source');
    }

    return NextResponse.json({ message: "Ticket updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating ticket", error }, { status: 500 });
  }
}