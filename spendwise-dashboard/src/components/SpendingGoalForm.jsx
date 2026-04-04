import { FaCheck } from "react-icons/fa6";
import styles from "./SpendingGoalForm.module.css";
import Button from "./Button";

export default function SpendingGoalForm() {
  return (
    <form className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="monthlyBudget" className={styles.formLabel}>
          Monthly Budget:
        </label>
        <input id="monthlyBudget" type="text" className={styles.formInput} />
      </div>
      <Button className="primaryBtn">
        <FaCheck />
        Set Budget
      </Button>
    </form>
  );
}
