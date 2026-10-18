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
    <div key={r.eventId} className={`reg-card ${canCancel ? "" : "past"}`}>
      {r.image && <img src={r.image} alt={r.eventName} />}
      <div className="reg-info">
        <h3>{r.eventName}</h3>
        <p className="meta">📅 {r.date}</p>
        {r.venue && <p className="meta">📍 {r.venue}</p>}
        <div className="reg-actions">
          <Link to={`/events/${r.eventId}`} className="btn-outline">
            View details
          </Link>
          {canCancel && (
            <button
              className="btn-danger"
              onClick={() => handleCancel(r.eventId)}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <h1 className="page-title">My Events</h1>

      {mine.length === 0 && (
        <p className="status">
          You haven't registered for any events yet.{" "}
          <Link to="/events">Browse events</Link>
        </p>
      )}

      {upcoming.length > 0 && (
        <section>
          <h2 className="section-title">Upcoming</h2>
          <div className="reg-list">
            {upcoming.map((r) => renderCard(r, true))}
          </div>
        </section>
      )}

      {completed.length > 0 && (
        <section>
          <h2 className="section-title">Completed</h2>
          <div className="reg-list">
            {completed.map((r) => renderCard(r, false))}
          </div>
        </section>
      )}
    </div>
  );
};
