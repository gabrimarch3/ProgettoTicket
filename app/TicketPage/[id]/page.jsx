import TicketForm from "@/app/(components)/TicketForm";
import React, { useState } from "react";

const getTicketById = async (id) => {
  try {
    // Check for cached ticket data
    const cachedTicketData = localStorage.getItem(`ticket-${id}`);
    if (cachedTicketData) {
      return JSON.parse(cachedTicketData);
    }

    // Fetch ticket data from API if not cached
    const res = await fetch(`https://progetto-ticket-dou6.vercel.app/api/Tickets/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to get ticket. Status: ${res.status}`);
    }

    const jsonData = await res.json();
    const ticketData = { foundTicket: jsonData };

    // Cache ticket data for future use
    localStorage.setItem(`ticket-${id}`, JSON.stringify(ticketData));
    return ticketData;
  } catch (error) {
    // Handle error
    console.error("Error fetching or parsing JSON:", error.message);
    throw new Error("Failed to get ticket.");
  }
};

const TicketPage = async ({ params }) => {
  const EDITMODE = params.id === "new" ? false : true;
  let updateTicketData = {};
  if (EDITMODE) {
    updateTicketData = await getTicketById(params.id);
    updateTicketData = updateTicketData.foundTicket;
  } else {
    updateTicketData = {
      _id: "new"
    }
  }
  return <TicketForm ticket={updateTicketData}/>;
};

export default TicketPage;