import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "../redux/authSlice";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.user);
  const authError = useSelector((state) => state.authentication.error);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => { // It wipes any old error left over from a previous visit
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (user) navigate("/events");
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      dispatch(clearError());
      setError("All fields are required");
      return;
    }

    setError("");
    dispatch(login({ email: cleanEmail, password }));
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          value={email}
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          value={password}
          placeholder="Password..."
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p>{error}</p>}
        {authError && <p>{authError}</p>}

        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};
