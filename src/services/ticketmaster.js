const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY;
const BASE_URL = "https://app.ticketmaster.com/discovery/v2";

export const fetchEvents = async ({
  keyword = "",
  city = "",
  classificationName = "",
  page = 0,
} = {}) => {
  const params = new URLSearchParams({
    apikey: API_KEY,
    size: 20,
    page,
    sort: "date,asc",
  });

  if (keyword) params.append("keyword", keyword);
  if (city) params.append("city", city);
  if (classificationName)
    params.append("classificationName", classificationName);

  const response = await fetch(`${BASE_URL}/events.json?${params}`);
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  return response.json();
};

export const fetchEventById = async (id) => {
  const response = await fetch(
    `${BASE_URL}/events/${id}.json?apikey=${API_KEY}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch event");
  }
  return response.json();
};
