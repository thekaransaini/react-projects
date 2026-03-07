import { useState } from "react";
import styles from "./Signup.module.css";

export default function Signup() {
  const [username, setUsername] = useState("jack12");
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  return (
    <main className={styles.signup}>
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Username</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button className="cta">Sign up</button>
        </div>
      </form>
    </main>
  );
}
