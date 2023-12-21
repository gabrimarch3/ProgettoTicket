import React from "react";
import TicketCard from "./(components)/TicketCard";

const getTickets = async () => {
  try {
    const res = await fetch("https://progetto-ticket-dou6.vercel.app/api/Tickets", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to get tickets. Status: ${res.status}`);
    }

    const data = await res.json();
    return { tickets: data }; // Restituisci i dati nel formato richiesto
  } catch (error) {
    // Gestisci eventuali errori di analisi JSON o fetch
    console.error("Failed to get tickets:", error.message);
    throw new Error(`Failed to get tickets. ${error.message}`);
  }
};

const Dashborad = ({ tickets }) => {
  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];

  return (
    <div className="p-5">
      <div>
        {tickets &&
          uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div key={categoryIndex} className="mb-4">
              <h2>{uniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                {tickets
                  .filter((ticket) => ticket.category === uniqueCategory)
                  .map((filteredTicket, _index) => (
                    <TicketCard
                      id={_index}
                      key={_index}
                      ticket={filteredTicket}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const { tickets } = await getTickets();

    return {
      props: {
        tickets,
      },
    };
  } catch (error) {
    console.error("Error getting ticket data:", error.message);
    return {
      notFound: true,
    };
  }
}

export default Dashborad;