import TicketForm from "@/app/(components)/TicketForm";
import React from "react";

const getTicketById = async (id) => {
  try {
    const res = await fetch(`https://progetto-ticket-dou6.vercel.app/api/Tickets/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to get ticket. Status: ${res.status}`);
    }

    const jsonData = await res.json();
    return jsonData;
  } catch (error) {
    // Gestisci eventuali errori di analisi JSON o fetch
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
