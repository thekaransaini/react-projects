import styles from "./FinancialTrendChart.module.css";
import { FaChartLine } from "react-icons/fa6";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function FinancialTrendChart({ data }) {
  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  function formatShortCurrency(value, currency = "INR") {
    let symbol = "₹";

    if (currency === "USD") symbol = "$";
    if (currency === "EUR") symbol = "€";

    if (value >= 1000000) {
      return `${symbol}${(value / 1000000).toFixed(1)}M`;
    }

    if (value >= 1000) {
      return `${symbol}${(value / 1000).toFixed(0)}K`;
    }

    return `${symbol}${value}`;
  }
  return (
    <div className={styles.financialTrendChartContainer}>
      <header className={styles.financialTrendChartHeading}>
        <FaChartLine className={styles.financialTrendChartIcon} />
        <h2>Balance Trend</h2>
      </header>
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={data} className={styles.financialTrendChart}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#31A27A" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#31A27A" stopOpacity={0.2} />
            </linearGradient>
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EA5256" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#EA5256" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => formatShortCurrency(value, "INR")} />
          <Tooltip formatter={(value) => formatCurrency(value)} />
          <Legend />
          <Bar
            dataKey="income"
            fill="url(#incomeGradient)"
            radius={[6, 6, 0, 0]}
          />
          <Bar
            dataKey="expense"
            fill="url(#expenseGradient)"
            radius={[6, 6, 0, 0]}
          />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#2678DF"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
