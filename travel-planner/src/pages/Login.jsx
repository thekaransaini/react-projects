import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import useTrip from "../hooks/useTrip";
import { Link, useNavigate } from "react-router-dom";
import ErrorMsg from "../components/ErrorMsg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isAuthenticated, dispatch } = useTrip();
  const navigate = useNavigate();

  function handleAdd(e) {
    e.preventDefault();
    login(email, password);
    setEmail("");
    setPassword("");
  }

  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      {error && <ErrorMsg message={error} />}
      <form className={styles.form}>
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
          <button className="cta" onClick={(e) => handleAdd(e)}>
            Login
          </button>
        </div>

        <div className={styles.signupRow}>
          <p>Don't have an account?</p>
          <Link
            to="/signup"
            className={styles.signupLink}
            onClick={() => {
              dispatch({ type: "clearError" });
            }}
          >
            Signup
          </Link>
        </div>
      </form>
    </main>
  );
}
