import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadEvents } from "../redux/eventsSlice";

const CATEGORIES = [
  "Music",
  "Sports",
  "Arts & Theatre",
  "Film",
  "Miscellaneous",
];

export const Events = () => {
  const dispatch = useDispatch();
  const { list, loading, error, totalPages } = useSelector(
    (state) => state.events,
  );

  // what the user is typing
  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");

  // what is actually applied to the search
  const [filters, setFilters] = useState({
    keyword: "",
    city: "",
    classificationName: "",
  });
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(loadEvents({ ...filters, page }));
  }, [dispatch, filters, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0);
    setFilters({
      keyword: keyword.trim(),
      city: city.trim(),
      classificationName: category,
    });
  };

  const handleClear = () => {
    setKeyword("");
    setCity("");
    setCategory("");
    setPage(0);
    setFilters({ keyword: "", city: "", classificationName: "" });
  };

  const maxPages = Math.min(totalPages, 50);

  return (
    <div>
      <h1>Events</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search events..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input
          type="text"
          placeholder="City..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button type="submit">Search</button>
        <button type="button" onClick={handleClear}>
          Clear
        </button>
      </form>

      {loading && <p>Loading events...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && list.length === 0 && <p>No events found.</p>}

      <div>
        {list.map((event) => {
          const venue = event._embedded?.venues?.[0];
          const image = event.images?.[0]?.url;
          const type = event.classifications?.[0]?.segment?.name;

          return (
            <div key={event.id}>
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
        })}
      </div>

      {maxPages > 1 && (
        <div>
          <button disabled={page === 0} onClick={() => setPage(page - 1)}>
            Previous
          </button>
          <span>
            {" "}
            Page {page + 1} of {maxPages}{" "}
          </span>
          <button
            disabled={page + 1 >= maxPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
