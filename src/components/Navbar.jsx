import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

const getInitialTheme = () => {
  const saved = localStorage.getItem("theme");
  if (saved) return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const Navbar = () => {
  const user = useSelector((state) => state.authentication.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/events" className="brand">
        EventHub
      </Link>
      {user ? (
        <>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/my-events">My Events</NavLink>
          <span className="user">{user.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </>
      )}
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle dark mode"
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
    </nav>
  );
};
