import { useState, useEffect } from "react";
import useTrip from "../hooks/useTrip";
import styles from "./Expenses.module.css";
import { Link } from "react-router-dom";

const BASE_URL_CURRENCY = "https://api.frankfurter.dev/v1/currencies";

export default function Expenses() {
  const {
    trip,
    cities,
    expenses,
    createExpense,
    deleteExpense,
    formattedTotalTripExpense,
  } = useTrip();
  const [currencyList, setCurrencyList] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [item, setItem] = useState("");
  const [rate, setRate] = useState("");
  const [currency, setCurrency] = useState("");
  const [category, setCategory] = useState("");

  const cityList = cities.filter((city) => city.tripId === trip.id);

  useEffect(() => {
    async function fetchCurrencyList() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(`${BASE_URL_CURRENCY}`);
        const data = await res.json();

        setCurrencyList(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCurrencyList();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    if (!item) return;
    const expense = {
      itemName: item,
      quantity: Number(quantity),
      rate: Number(rate),
      currency,
      category,
    };
    console.log(expense);
    await createExpense(trip.id, expense);
    setItem("");
    setQuantity(1);
    setRate("");
    setCurrency("");
    setCategory("");
  }

  async function handleDelete(e, id) {
    e.preventDefault();
    await deleteExpense(id);
  }

  return (
    <div className={styles.expensesContainer}>
      <header className={styles.header}>
        <Link className={styles.backBtn} to={`/app/trips/${trip.id}`}>
          <i className="fa-solid fa-left-long"></i>
        </Link>
        <h1>Expenses 💸</h1>
      </header>
      <main>
        <div className={styles.formHeading}>
          <h2>Track your trip expenses 💸</h2>
        </div>
        <form className={styles.expensesForm}>
          <div className={styles.flex}>
            <div className={styles.row}>
              <select
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              >
                {Array.from({ length: 20 }, (_, i) => (
                  <option value={i + 1} key={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className={`${styles.row} ${styles.itemInput}`}>
              <input
                type="text"
                placeholder="Item..."
                value={item}
                onChange={(e) => setItem(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.row}>
            <input
              type="text"
              placeholder="Rate (per unit)..."
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </div>
          <div className={styles.row}>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option>Select currency</option>
              {Object.entries(currencyList).map(([code, name]) => (
                <option key={code} value={code}>
                  {code} - {name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.row}>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Select category</option>
              <option value="🍔 Food">🍔 Food</option>
              <option value="🏨 Accommodation">🏨 Accommodation</option>
              <option value="🚕 Transport">🚕 Transport</option>
              <option value="🎟️ Activities">🎟️ Activities</option>
              <option value="🛍️ Shopping">🛍️ Shopping</option>
              <option value="☕ Miscellaneous">☕ Miscellaneous</option>
            </select>
          </div>
          <div className={styles.row}>
            <button onClick={(e) => handleAdd(e)}>Add</button>
          </div>
        </form>

        <div className={styles.expensesContent}>
          <div className={styles.tripDetails}>
            <h2>{trip?.tripName}</h2>
            {cityList.map((city, i) => (
              <>
                <span key={city.id}>
                  {city.cityName}&nbsp;&nbsp;
                  <img
                    src={`https://flagcdn.com/16x12/${city.countryCode.toLowerCase()}.png`}
                    alt={`Image of ${city.country} flag`}
                  />
                  &nbsp;
                </span>
                {cityList.length - 1 !== i && (
                  <span key={i + 1}>&rarr;&nbsp;</span>
                )}
              </>
            ))}
          </div>

          <ul className={styles.expenseList}>
            {expenses.map((expense, i) => (
              <li className={styles.expenseItem}>
                <div className={styles.expenseInfoBox1}>
                  <p className={styles.itemName}>
                    {i + 1}. {expense.itemName}
                  </p>
                  <p className={styles.category}>{expense.category}</p>
                </div>
                <div className={styles.expenseInfoBox2}>
                  <p>Qty: {expense.quantity}</p>
                  <p>
                    Rate:{" "}
                    {Number(expense.rate).toLocaleString("en-IN", {
                      style: "currency",
                      currency: expense.currency,
                      minimumFractionDigits: Number.isInteger(expense.rate)
                        ? 0
                        : 2,
                    })}
                  </p>
                  <p>
                    Total:{" "}
                    {Number(expense.rate * expense.quantity).toLocaleString(
                      "en-IN",
                      {
                        style: "currency",
                        currency: expense.currency,
                        minimumFractionDigits: Number.isInteger(expense.rate)
                          ? 0
                          : 2,
                      },
                    )}
                  </p>
                </div>
                <button onClick={(e) => handleDelete(e, expense.id)}>
                  &times;
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.tableContainer}>
            {expenses.length > 0 && (
              <table>
                <thead>
                  <tr>
                    <th>Serial No.</th>
                    <th>Item</th>
                    <th>Category</th>
                    <th>Qty</th>
                    <th>Rate</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense, i) => (
                    <>
                      <tr key={i + 1}>
                        <td>{i + 1}</td>
                        <td>{expense.itemName}</td>
                        <td>{expense.category}</td>
                        <td>{expense.quantity}</td>
                        <td>
                          {Number(expense.rate).toLocaleString("en-IN", {
                            style: "currency",
                            currency: expense.currency,
                            minimumFractionDigits: Number.isInteger(
                              expense.rate,
                            )
                              ? 0
                              : 2,
                          })}
                        </td>
                        <td>
                          {Number(
                            expense.rate * expense.quantity,
                          ).toLocaleString("en-IN", {
                            style: "currency",
                            currency: expense.currency,
                            minimumFractionDigits: Number.isInteger(
                              expense.rate,
                            )
                              ? 0
                              : 2,
                          })}
                        </td>
                        <td>
                          <button onClick={(e) => handleDelete(e, expense.id)}>
                            &times;
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <p>
          {expenses.length === 0 ? (
            <>
              <em>No expenses added yet.&nbsp;</em>
              <em>Start tracking your spending 💸</em>
            </>
          ) : (
            <em>{`Total: ${formattedTotalTripExpense} 💸`}</em>
          )}
        </p>
      </footer>
    </div>
  );
}
