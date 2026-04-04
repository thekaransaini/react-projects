import GoalProgressSummary from "./GoalProgressSummary";
import styles from "./SpendingGoalCard.module.css";
import SpendingGoalForm from "./SpendingGoalForm";

export default function SpendingGoalCard() {
  return (
    <section className={styles.goalCard}>
      <header className={styles.goalCardHeading}>
        <h2>Spending Goal</h2>
      </header>
      <div className={styles.goalCardContent}>
        <SpendingGoalForm />
        <GoalProgressSummary />
      </div>
    </section>
  );
}
