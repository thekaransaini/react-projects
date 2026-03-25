import { useState } from "react";
import styles from "./PackingList.module.css";
import useTrip from "../hooks/useTrip";
import { Link } from "react-router-dom";

export default function PackingList() {
  const {
    trip,
    cities,
    packingList,
    createPackingItem,
    updatePackingItem,
    deletePackingItem,
  } = useTrip();
  const [quantity, setQuantity] = useState(1);
  const [item, setItem] = useState("");
  const [packed, setPacked] = useState(false);
  const packedItems = packingList.filter((item) => item.packed === true).length;
  const packedItemPercent = Math.round(
    (packedItems / packingList.length) * 100,
  );
  const cityList = cities.filter((city) => city.tripId === trip.id);

  async function handleAdd(e) {
    e.preventDefault();
    if (!item) return;
    const packingItem = {
      itemName: item,
      quantity,
      packed,
    };
    await createPackingItem(trip.id, packingItem);
    setItem("");
    setQuantity(1);
  }

  async function handleUpdate(e, id) {
    console.log("packinglist", id, e.target.checked);
    e.preventDefault();
    setPacked(e.target.checked);
    await updatePackingItem(e.target.checked, id);
  }

  async function handleDelete(e, id) {
    e.preventDefault();
    await deletePackingItem(id);
  }

  return (
    <div className={styles.packingListContainer}>
      <header className={styles.header}>
        <Link className={styles.backBtn} to={`/app/trips/${trip.id}`}>
          <i className="fa-solid fa-left-long"></i>
        </Link>
        <h1>Packing List 🧳</h1>
      </header>
      <main className={styles.main}>
        <div className={styles.formBody}>
          <div className={styles.formHeading}>
            <h2>What do you need for your trip ✈️?</h2>
          </div>
          <form className={styles.packingListForm}>
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
            <div className={`${styles.itemInput} ${styles.row}`}>
              <input
                type="text"
                placeholder="Item..."
                value={item}
                onChange={(e) => setItem(e.target.value)}
              />
            </div>
            <div className={styles.row}>
              <button onClick={(e) => handleAdd(e)}>Add</button>
            </div>
          </form>
        </div>
        <div className={styles.packingListContent}>
          <h2>{trip?.tripName}</h2>
          {cityList.map((city, i) => (
            <>
              <span key={city.id} className={styles.cityList}>
                {city.cityName}&nbsp;&nbsp;
                <img
                  src={`https://flagcdn.com/16x12/${city.countryCode.toLowerCase()}.png`}
                  alt={`Image of ${city.country} flag`}
                />
                &nbsp;
              </span>
              {cityList.length - 1 !== i && (
                <span key={i + 1} className={styles.cityList}>
                  &rarr;&nbsp;
                </span>
              )}
            </>
          ))}
          <ul className={styles.packingList}>
            {packingList.map((item) => (
              <li key={item.id} className={styles.packingItem}>
                <input
                  type="checkbox"
                  checked={item.packed}
                  onChange={(e) => handleUpdate(e, item.id)}
                />
                <span className={item.packed ? styles.packed : ""}>
                  {item.quantity} {item.itemName}
                </span>
                <button onClick={(e) => handleDelete(e, item.id)}>
                  &times;
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <footer className={styles.footer}>
        {packingList.length === 0 ? (
          <p>
            <em>Start adding some items to your packing list 🚀</em>
          </p>
        ) : packedItemPercent === 100 ? (
          <p>
            <em>You got everything! Ready to go ✈️</em>
          </p>
        ) : (
          <>
            <p>
              Items: {packedItems} / {packingList.length}
            </p>
            <div className={styles.progressContainer}>
              <progress
                className={styles.progress}
                value={packedItems}
                max={packingList.length}
              ></progress>
            </div>
            <p>({packedItemPercent}%)</p>
          </>
        )}
      </footer>
    </div>
  );
}
