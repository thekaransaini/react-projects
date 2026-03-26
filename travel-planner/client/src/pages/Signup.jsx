import { useEffect, useState } from "react";
import styles from "./Signup.module.css";
import useTrip from "../hooks/useTrip";
import ErrorMsg from "../components/ErrorMsg";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { createUser, error, isAuthenticated, dispatch } = useTrip();
  const navigate = useNavigate();

  function handleAdd(e) {
    e.preventDefault();
    const user = {
      username,
      email,
      password,
    };
    createUser(user);
    setUsername("");
    setEmail("");
    setPassword("");
  }

  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.signup}>
      <Logo />
      {error && <ErrorMsg message={error} />}
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Username</label>
          <input
            type="email"
            id="email"
            placeholder="johndoe87"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button onClick={(e) => handleAdd(e)}>Sign up</button>
        </div>

        <div className={styles.loginRow}>
          <p>Already have an account?</p>
          <Link
            to="/login"
            className={styles.loginLink}
            onClick={() => {
              dispatch({ type: "clearError" });
            }}
          >
            Login
          </Link>
        </div>
      </form>
    </main>
  );
}
