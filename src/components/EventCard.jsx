import { Link } from "react-router-dom";

export const EventCard = ({ event }) => {
  const venue = event._embedded?.venues?.[0];
  const image = event.images?.[0]?.url;
  const type = event.classifications?.[0]?.segment?.name;

  return (
    <article className="event-card">
      <div className="event-card-img">
        {image ? (
          <img src={image} alt={event.name} />
        ) : (
          <div className="no-image">No image</div>
        )}
        {type && <span className="badge">{type}</span>}
      </div>

      <div className="event-card-body">
        <h3>{event.name}</h3>
        <p className="meta">
          📅 {event.dates?.start?.localDate}{" "}
          {event.dates?.start?.localTime?.slice(0, 5)}
        </p>
        <p className="meta">
          📍 {venue?.name}
          {venue?.city?.name ? `, ${venue.city.name}` : ""}
        </p>
        <Link to={`/events/${event.id}`} className="btn-link">
          View details
        </Link>
      </div>
    </article>
  );
};
