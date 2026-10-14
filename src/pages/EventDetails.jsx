import { useParams } from "react-router-dom";

export const EventDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Event {id}</h1>
    </div>
  );
};
