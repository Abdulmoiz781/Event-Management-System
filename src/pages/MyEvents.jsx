import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { cancelRegistration } from "../redux/registrationsSlice";

export const MyEvents = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.user);
  const items = useSelector((state) => state.registrations.items);

  const mine = items.filter((r) => r.userId === user.id);

  const today = new Date().toISOString().split("T")[0];
  const upcoming = mine.filter((r) => !r.date || r.date >= today);
  const completed = mine.filter((r) => r.date && r.date < today);

  const handleCancel = (eventId) => {
    dispatch(cancelRegistration({ userId: user.id, eventId }));
  };

  const renderCard = (r, canCancel) => (
    <div key={r.eventId}>
      {r.image && <img src={r.image} alt={r.eventName} width="200" />}
      <h3>{r.eventName}</h3>
      <p>Date: {r.date}</p>
      {r.venue && <p>Venue: {r.venue}</p>}
      <Link to={`/events/${r.eventId}`}>View details</Link>
      {canCancel && (
        <button onClick={() => handleCancel(r.eventId)}>
          Cancel registration
        </button>
      )}
    </div>
  );

  return (
    <div>
      <h1>My Events</h1>

      {mine.length === 0 && (
        <p>
          You haven't registered for any events yet.{" "}
          <Link to="/events">Browse events</Link>
        </p>
      )}

      {upcoming.length > 0 && (
        <section>
          <h2>Upcoming</h2>
          {upcoming.map((r) => renderCard(r, true))}
        </section>
      )}

      {completed.length > 0 && (
        <section>
          <h2>Completed</h2>
          {completed.map((r) => renderCard(r, false))}
        </section>
      )}
    </div>
  );
};
