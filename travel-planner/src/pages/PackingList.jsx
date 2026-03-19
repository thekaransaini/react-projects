import styles from "./PackingList.module.css";

export default function PackingList() {
  return (
    <div className={styles.packingListContainer}>
      <header className={styles.header}>
        <h1>Packing List 🧳</h1>
      </header>
      <main>
        <form className={styles.packingListForm}>
          <div className={styles.row}>
            <h2>What do you need for your trip ✈️?</h2>
          </div>
          <div className={styles.row}>
            <select name="" id="">
              {Array.from({ length: 20 }, (_, i) => (
                <option value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>
          <div className={styles.row}>
            <input type="text" placeholder="Item..." />
          </div>
          <div className={styles.row}>
            <button>Add</button>
          </div>
        </form>
        <div className={styles.packingListContent}>
          <h2>Trip Name</h2>
          <p>city1 &rarr; city2 &rarr; city3 &rarr; city4</p>
          <ul>
            <li>
              <div className={styles.listItem}>
                <input type="checkbox" />
                <span>1 Passport</span>
                <button>&times;</button>
              </div>
            </li>
          </ul>
        </div>
      </main>
      <footer className={styles.footer}>
        <p>Items: 2 / 30</p>
        <progress className={styles.progress} value={30} max={100}></progress>
        <p>(30%)</p>
      </footer>
    </div>
  );
}
