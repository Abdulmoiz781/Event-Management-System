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

  useEffect(() => {
    // It wipes any old error left over from a previous visit
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
    <div className="auth-card">
      <h1>Welcome back</h1>
      <p className="auth-subtitle">Log in to manage your events.</p>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="form-error">{error}</p>}
        {authError && <p className="form-error">{authError}</p>}

        <button type="submit" className="btn-large btn-full">
          Login
        </button>
      </form>

      <p className="auth-switch">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};
