import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/authSlice";

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.authentication.users);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanEmail || !password) {
      setError("All fields are required");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (users.some((u) => u.email === cleanEmail)) {
      setError("This email is already registered");
      return;
    }

    dispatch(register({ name: cleanName, email: cleanEmail, password }));
    navigate("/login");
  };

  return (
    <div className="auth-card">
      <h1>Create account</h1>
      <p className="auth-subtitle">Sign up to register for events.</p>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Your name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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
            placeholder="At least 6 characters"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        <button type="submit" className="btn-large btn-full">
          Register
        </button>
      </form>

      <p className="auth-switch">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};
