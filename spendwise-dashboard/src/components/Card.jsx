import styles from "./Card.module.css";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
export default function Card({ title, amount, trend, color }) {
  return (
    <article className={styles.card} style={{ backgroundColor: color }}>
      <div className={styles.cardHeader}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.amount}>
          <span>$</span>
          {amount}
        </p>
      </div>
      <p className={styles.trend}>
        {trend < 0 ? (
          <IoMdArrowDropdown className={styles.trendIcon} />
        ) : (
          <IoMdArrowDropup className={styles.trendIcon} />
        )}
        <strong>{trend}%</strong>&nbsp;this month
      </p>
    </article>
  );
}
