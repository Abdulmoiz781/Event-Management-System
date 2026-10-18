import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventById } from "../services/ticketmaster";
import {
  registerForEvent,
  cancelRegistration,
} from "../redux/registrationsSlice";

export const EventDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.user);
  const registrations = useSelector((state) => state.registrations.items);
  const [message, setMessage] = useState("");

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

  if (loading) return <p className="status">Loading...</p>;
  if (error) return <p className="status error">{error}</p>;
  if (!event) return null;

  const venue = event._embedded?.venues?.[0];
  const image = event.images?.[0]?.url;
  const segment = event.classifications?.[0]?.segment?.name;
  const genre = event.classifications?.[0]?.genre?.name;
  const price = event.priceRanges?.[0];

  const time = event.dates?.start?.localTime?.slice(0, 5);
  const category = segment && segment !== "Undefined" ? segment : null;

  const eventDate = event.dates?.start?.localDate;
  const today = new Date().toISOString().split("T")[0];
  const isPast = eventDate ? eventDate < today : false;

  const isRegistered = registrations.some(
    (r) => r.userId === user?.id && r.eventId === event.id,
  );

  const handleRegister = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    dispatch(
      registerForEvent({
        userId: user.id,
        eventId: event.id,
        eventName: event.name,
        date: eventDate,
        venue: venue?.name || "",
        image,
      }),
    );
    setMessage("You have registered for this event.");
  };

  const handleCancel = () => {
    dispatch(cancelRegistration({ userId: user.id, eventId: event.id }));
    setMessage("Your registration has been cancelled.");
  };

  return (
    <div className="details">
      <Link to="/events" className="back-link">
        ← Back to events
      </Link>

      <div className="details-card">
        {image && (
          <div className="details-hero">
            <img src={image} alt={event.name} />
          </div>
        )}

        <div className="details-body">
          {category && <span className="badge-inline">{category}</span>}
          <h1>{event.name}</h1>

          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">📅 Date</span>
              <span>
                {eventDate} {time && `at ${time}`}
              </span>
            </div>

            <div className="info-item">
              <span className="info-label">📍 Venue</span>
              <span>
                {venue?.name}
                {venue?.city?.name ? `, ${venue.city.name}` : ""}
                {venue?.country?.name ? `, ${venue.country.name}` : ""}
              </span>
            </div>

            {venue?.address?.line1 && (
              <div className="info-item">
                <span className="info-label">🏠 Address</span>
                <span>{venue.address.line1}</span>
              </div>
            )}

            {price && (
              <div className="info-item">
                <span className="info-label">💲 Price</span>
                <span>
                  {price.min} - {price.max} {price.currency}
                </span>
              </div>
            )}

            {genre && genre !== "Undefined" && (
              <div className="info-item">
                <span className="info-label">🎵 Genre</span>
                <span>{genre}</span>
              </div>
            )}
          </div>

          {event.info && <p className="details-info">{event.info}</p>}

          <div className="details-actions">
            {isPast ? (
              <p className="status">This event has already taken place.</p>
            ) : isRegistered ? (
              <button className="btn-danger" onClick={handleCancel}>
                Cancel registration
              </button>
            ) : (
              <button className="btn-large" onClick={handleRegister}>
                Register for this event
              </button>
            )}

            {event.url && (
              <a
                href={event.url}
                target="_blank"
                rel="noreferrer"
                className="btn-outline"
              >
                View on Ticketmaster
              </a>
            )}
          </div>

          {message && <p className="success">{message}</p>}
        </div>
      </div>
    </div>
  );
};
