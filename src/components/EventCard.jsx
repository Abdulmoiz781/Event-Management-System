import { Link } from "react-router-dom";

export const EventCard = ({ event }) => {
  const venue = event._embedded?.venues?.[0];
  const image = event.images?.[0]?.url;
  const type = event.classifications?.[0]?.segment?.name;

  return (
    <div>
      {image && <img src={image} alt={event.name} width="200" />}
      <h3>{event.name}</h3>
      <p>
        {event.dates?.start?.localDate} {event.dates?.start?.localTime}
      </p>
      <p>
        {venue?.name}
        {venue?.city?.name ? `, ${venue.city.name}` : ""}
      </p>
      {type && <p>{type}</p>}
      <Link to={`/events/${event.id}`}>View details</Link>
    </div>
  );
};
