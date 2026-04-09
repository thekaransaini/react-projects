import styles from "./Dashboard.module.css";
import SpendingGoalCard from "./SpendingGoalCard";
import SummaryCards from "./SummaryCards";
import FinancialTrendChart from "./FinancialTrendChart";
import SpendingBreakdownChart from "./SpendingBreakdownChart";
import InsightsPanel from "./InsightsPanel";
import { useState } from "react";

const transactions = [
  {
    id: 1,
    date: "2026-03-01T00:00:00.000Z",
    amount: 50000,
    category: "Salary",
    type: "income",
  },
  {
    id: 2,
    date: "2026-03-10T00:00:00.000Z",
    amount: 8000,
    category: "Freelance",
    type: "income",
  },
  {
    id: 3,
    date: "2026-03-15T00:00:00.000Z",
    amount: 2000,
    category: "Investment Return",
    type: "income",
  },

  {
    id: 4,
    date: "2026-03-02T00:00:00.000Z",
    amount: 1200,
    category: "Food",
    type: "expense",
  },
  {
    id: 5,
    date: "2026-03-03T00:00:00.000Z",
    amount: 800,
    category: "Transport",
    type: "expense",
  },
  {
    id: 6,
    date: "2026-03-05T00:00:00.000Z",
    amount: 2500,
    category: "Shopping",
    type: "expense",
  },
  {
    id: 7,
    date: "2026-03-07T00:00:00.000Z",
    amount: 1500,
    category: "Bills",
    type: "expense",
  },
  {
    id: 8,
    date: "2026-03-09T00:00:00.000Z",
    amount: 2000,
    category: "Food",
    type: "expense",
  },
  {
    id: 9,
    date: "2026-03-11T00:00:00.000Z",
    amount: 1000,
    category: "Entertainment",
    type: "expense",
  },
  {
    id: 10,
    date: "2026-03-12T00:00:00.000Z",
    amount: 15000,
    category: "Rent",
    type: "expense",
  },
  {
    id: 11,
    date: "2026-03-13T00:00:00.000Z",
    amount: 50,
    category: "Food",
    type: "expense",
  },
  {
    id: 12,
    date: "2026-03-14T00:00:00.000Z",
    amount: 700,
    category: "Health",
    type: "expense",
  },
  {
    id: 13,
    date: "2026-03-16T00:00:00.000Z",
    amount: 1200,
    category: "Education",
    type: "expense",
  },
  {
    id: 14,
    date: "2026-03-18T00:00:00.000Z",
    amount: 900,
    category: "Subscriptions",
    type: "expense",
  },
  {
    id: 15,
    date: "2026-03-20T00:00:00.000Z",
    amount: 600,
    category: "Utilities",
    type: "expense",
  },
  {
    id: 16,
    date: "2026-03-22T00:00:00.000Z",
    amount: 1800,
    category: "Travel",
    type: "expense",
  },
  {
    id: 17,
    date: "2026-03-25T00:00:00.000Z",
    amount: 300,
    category: "Miscellaneous",
    type: "expense",
  },

  {
    id: 18,
    date: "2026-02-01T00:00:00.000Z",
    amount: 48000,
    category: "Salary",
    type: "income",
  },
  {
    id: 19,
    date: "2026-02-08T00:00:00.000Z",
    amount: 6000,
    category: "Freelance",
    type: "income",
  },

  {
    id: 20,
    date: "2026-02-05T00:00:00.000Z",
    amount: 1800,
    category: "Food",
    type: "expense",
  },
  {
    id: 21,
    date: "2026-02-08T00:00:00.000Z",
    amount: 2200,
    category: "Shopping",
    type: "expense",
  },
  {
    id: 22,
    date: "2026-02-10T00:00:00.000Z",
    amount: 14000,
    category: "Rent",
    type: "expense",
  },
  {
    id: 23,
    date: "2026-02-15T00:00:00.000Z",
    amount: 900,
    category: "Transport",
    type: "expense",
  },
  {
    id: 24,
    date: "2026-02-20T00:00:00.000Z",
    amount: 1200,
    category: "Bills",
    type: "expense",
  },
  {
    id: 25,
    date: "2026-02-25T00:00:00.000Z",
    amount: 500,
    category: "Entertainment",
    type: "expense",
  },

  {
    id: 26,
    date: "2026-01-01T00:00:00.000Z",
    amount: 47000,
    category: "Salary",
    type: "income",
  },
  {
    id: 27,
    date: "2026-01-12T00:00:00.000Z",
    amount: 4000,
    category: "Freelance",
    type: "income",
  },

  {
    id: 28,
    date: "2026-01-05T00:00:00.000Z",
    amount: 1600,
    category: "Food",
    type: "expense",
  },
  {
    id: 29,
    date: "2026-01-10T00:00:00.000Z",
    amount: 2000,
    category: "Shopping",
    type: "expense",
  },
  {
    id: 30,
    date: "2026-01-12T00:00:00.000Z",
    amount: 13000,
    category: "Rent",
    type: "expense",
  },
  {
    id: 31,
    date: "2026-01-15T00:00:00.000Z",
    amount: 800,
    category: "Transport",
    type: "expense",
  },
  {
    id: 32,
    date: "2026-01-18T00:00:00.000Z",
    amount: 1000,
    category: "Bills",
    type: "expense",
  },
  {
    id: 33,
    date: "2026-01-22T00:00:00.000Z",
    amount: 700,
    category: "Health",
    type: "expense",
  },

  {
    id: 34,
    date: "2026-03-28T00:00:00.000Z",
    amount: 0,
    category: "Refund",
    type: "income",
  },
  {
    id: 35,
    date: "2026-03-29T00:00:00.000Z",
    amount: 99999,
    category: "Investment",
    type: "income",
  },
];

const months = [...new Set(transactions.map((t) => t.date.slice(0, 7)))]
  .sort()
  .reverse();

export default function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  function getMonthlyData(transactions) {
    const result = {};

    transactions.forEach((t) => {
      const date = new Date(t.date);
      const monthKey = date.getFullYear() + "-" + (date.getMonth() + 1);

      if (!result[monthKey]) {
        result[monthKey] = {
          income: 0,
          expense: 0,
          label: date.toLocaleString("default", { month: "short" }),
        };
      }

      if (t.type === "income") {
        result[monthKey].income += t.amount;
      } else {
        result[monthKey].expense += t.amount;
      }
    });

    return Object.keys(result)
      .sort((a, b) => new Date(a) - new Date(b))
      .map((key) => ({
        month: result[key].label,
        income: result[key].income,
        expense: result[key].expense,
        balance: result[key].income - result[key].expense,
      }));
  }

  function getCategoryData(transactions, selectedMonth) {
    const result = {};

    transactions.forEach((t) => {
      const month = t.date.slice(0, 7);

      if (t.type === "expense" && month === selectedMonth) {
        if (!result[t.category]) {
          result[t.category] = 0;
        }
        result[t.category] += t.amount;
      }
    });

    let data = Object.keys(result).map((key) => ({
      name: key,
      value: result[key],
    }));

    data.sort((a, b) => b.value - a.value);

    const topCategories = data.slice(0, 5);

    const othersValue = data
      .slice(5)
      .reduce((sum, item) => sum + item.value, 0);

    if (othersValue > 0) {
      topCategories.push({
        name: "Others",
        value: othersValue,
      });
    }

    return topCategories;
  }

  function getTotalExpense(data) {
    return data.reduce((sum, item) => sum + item.value, 0);
  }

  const lineData = getMonthlyData(transactions);
  const pieData = getCategoryData(transactions, selectedMonth);
  const total = getTotalExpense(pieData);

  return (
    <main>
      <SummaryCards />
      <SpendingGoalCard />
      <FinancialTrendChart data={lineData} />
      <div className={styles.analyticsSection}>
        <SpendingBreakdownChart data={pieData} total={total} months={months} />
        <InsightsPanel />
      </div>
    </main>
  );
}
