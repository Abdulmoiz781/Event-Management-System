import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/events">Events</Link>
      <Link to="/my-events">My Events</Link>
    </nav>
  );
};
