import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadEvents } from "../redux/eventsSlice";
import { EventCard } from "../components/EventCard";

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
      ...filters,
      keyword: keyword.trim(),
      city: city.trim(),
    });
  };

  const handleClear = () => {
    setKeyword("");
    setCity("");
    setPage(0);
    setFilters({ keyword: "", city: "", classificationName: "" });
  };

  const handleCategory = (c) => {
    setPage(0);
    setFilters({ ...filters, classificationName: c });
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
        <div>
          <button
            type="button"
            onClick={() => handleCategory("")}
            disabled={filters.classificationName === ""}
          >
            All
          </button>
          {CATEGORIES.map((c) => (
            <button
              type="button"
              key={c}
              onClick={() => handleCategory(c)}
              disabled={filters.classificationName === c}
            >
              {c}
            </button>
          ))}
        </div>
        <button type="submit">Search</button>
        <button type="button" onClick={handleClear}>
          Clear
        </button>
      </form>

      {loading && <p>Loading events...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && list.length === 0 && <p>No events found.</p>}

      <div>
        {list.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
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
