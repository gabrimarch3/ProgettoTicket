import TicketForm from "@/app/(components)/TicketForm";
import { useRouter } from "next/router";

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
    console.error("Error fetching or parsing JSON:", error.message);
    throw new Error("Failed to get ticket.");
  }
};

const TicketPage = ({ ticket }) => {
  const router = useRouter();
  const { id } = router.query;

  const EDITMODE = id === "new" ? false : true;

  return <TicketForm ticket={ticket} />;
};

export async function getServerSideProps({ params }) {
  try {
    let updateTicketData = {};

    if (params.id !== "new") {
      updateTicketData = await getTicketById(params.id);
      updateTicketData = updateTicketData.foundTicket;
    }

    return {
      props: {
        ticket: updateTicketData,
      },
    };
  } catch (error) {
    console.error("Error getting ticket data:", error.message);
    return {
      notFound: true,
    };
  }
}

export default TicketPage;