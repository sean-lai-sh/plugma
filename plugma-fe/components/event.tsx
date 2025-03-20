import { fetchUserEvents } from "@/lib/supabaseHelper.ts/fetchUserEvents";
import { supabase } from "../lib/supabaseClient";
import { GetServerSideProps } from "next";

// Define Event Type
interface Event {
  id: string;
  title: string;
}

// Define Props Type
interface HomeProps {
  events: Event[];
}

// Home Component
export default function Home({ events }: HomeProps) {
  return (
    <div>
      <h1>Upcoming Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>{event.title}</li>
        ))}
      </ul>
    </div>
  );
}

// Fetch events at build time (SSR)
export const getServerSideProps: GetServerSideProps = async () => {
  const { data: events, error } = await fetchUserEvents(
    
  );

  if (error) {
    console.error("Error fetching events:", error.message);
  }

  return { props: { events: events || [] } };
};
