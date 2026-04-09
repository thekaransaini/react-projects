import styles from "./InsightsPanel.module.css";
import { FaLightbulb } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";
import { LuCrown } from "react-icons/lu";
import { LuPiggyBank } from "react-icons/lu";
import { MdOutlineTipsAndUpdates } from "react-icons/md";

export default function InsightsPanel() {
  return (
    <div className={styles.insightsPanel}>
      <header className={styles.insightsPanelHeading}>
        <FaLightbulb className={styles.insightsPanelIcon} />
        <h2>Insights</h2>
      </header>
      <ul className={styles.insightsList}>
        <li className={styles.insight}>
          <LuCrown />
          Highest Spending:
        </li>
        <li className={styles.insight}>
          <LuPiggyBank />
          Savings:
        </li>
        <li className={styles.insight}>
          <BsGraphUpArrow />
          Spending increased by 12%
        </li>
        <li className={styles.insight}>
          <MdOutlineTipsAndUpdates />
          Reduce Food expenses
        </li>
      </ul>
    </div>
  );
}
