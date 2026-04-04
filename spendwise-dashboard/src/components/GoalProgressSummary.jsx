import styles from "./GoalProgressSummary.module.css";
import { FaCheckCircle } from "react-icons/fa";

export default function GoalProgressSummary() {
  return (
    <article className={styles.goalSummary}>
      <header className={styles.goalSummaryHeading}>
        <h2>
          <FaCheckCircle className={styles.checkCircleIcon} />
          Budget Set
        </h2>
      </header>
      <div className={styles.goalSummaryContent}>
        <div className={styles.goalDetails}>
          <p>Budget: $20000</p>
          <p>Spent: $12,500</p>
          <p>Remaining: $7,500</p>
        </div>
        <footer className={styles.goalSummaryFooter}>
          <div className={styles.goalProgressContainer}>
            <progress
              className={styles.goalProgressBar}
              value={4}
              max={10}
            ></progress>
          </div>
          <p>
            <strong>62%</strong> used
          </p>
        </footer>
      </div>
    </article>
  );
}
