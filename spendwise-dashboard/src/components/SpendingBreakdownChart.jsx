import styles from "./SpendingBreakdownChart.module.css";
import { FaChartPie } from "react-icons/fa";

import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import Dropdown from "./Dropdown";

const COLORS = [
  "#EF4444", // Rent
  "#F59E0B", // Shopping
  "#06B6D4", // Food
  "#8B5CF6", // Entertainment
  "#22C55E", // Transport
  "#9CA3AF", // Others
];

function formatMonth(monthStr) {
  const date = new Date(monthStr + "-01");

  return date.toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function SpendingBreakdownChart({ data, total, months }) {
  return (
    <div className={styles.spendingBreakdownChartContainer}>
      <header className={styles.spendingBreakdownChartHeader}>
        <div className={styles.spendingBreakdownChartHeading}>
          <FaChartPie className={styles.spendingBreakdownChartIcon} />
          <h2>Spending Breakdown</h2>
        </div>
        <Dropdown options={months} />
      </header>

      <div className={styles.content}>
        {/* 🔹 PIE CHART */}
        <div className={styles.chart}>
          <ResponsiveContainer width={250} height={250}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={3}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip formatter={(value) => `₹${value}`} />
            </PieChart>
          </ResponsiveContainer>

          {/* 🔥 CENTER TEXT */}
          <div className={styles.centerText}>
            <h3>₹{total}</h3>
            <p>TOTAL MONTHLY</p>
          </div>
        </div>

        {/* 🔹 LEGEND */}
        <div className={styles.legend}>
          {data.map((item, index) => (
            <div key={index} className={styles.legendItem}>
              <span
                className={styles.dot}
                style={{ backgroundColor: COLORS[index] }}
              ></span>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
