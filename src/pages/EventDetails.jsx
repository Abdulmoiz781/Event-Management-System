import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchEventById } from "../services/ticketmaster";

export const EventDetails = () => {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchEventById(id);
        setEvent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!event) return null;

  const venue = event._embedded?.venues?.[0];
  const image = event.images?.[0]?.url;
  const segment = event.classifications?.[0]?.segment?.name;
  const genre = event.classifications?.[0]?.genre?.name;
  const price = event.priceRanges?.[0];

  return (
    <div>
      <Link to="/events">Back to events</Link>

      <h1>{event.name}</h1>
      {image && <img src={image} alt={event.name} width="400" />}

      <p>
        Date: {event.dates?.start?.localDate} {event.dates?.start?.localTime}
      </p>

      <p>
        Venue: {venue?.name}
        {venue?.city?.name ? `, ${venue.city.name}` : ""}
        {venue?.country?.name ? `, ${venue.country.name}` : ""}
      </p>
      {venue?.address?.line1 && <p>Address: {venue.address.line1}</p>}

      {segment && (
        <p>
          Category: {segment}
          {genre && genre !== "Undefined" ? ` / ${genre}` : ""}
        </p>
      )}

      {price && (
        <p>
          Price: {price.min} - {price.max} {price.currency}
        </p>
      )}

      {event.info && <p>{event.info}</p>}

      {event.url && (
        <p>
          <a href={event.url} target="_blank" rel="noreferrer">
            View on Ticketmaster
          </a>
        </p>
      )}

      <button>Register</button>
    </div>
  );
};
