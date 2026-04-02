import styles from "./SummaryCards.module.css";
import Card from "./Card";

export default function SummaryCards() {
  return (
    <section className={styles.summaryCards}>
      <Card title="Total Balance" amount="45,000" trend="2.5" color="#2678DF" />
      <Card title="Total Income" amount="60,000" trend="5.0" color="#31A27A" />
      <Card
        title="Total Expenses"
        amount="15,000"
        trend="-8.0"
        color="#EA5256"
      />
    </section>
  );
}
