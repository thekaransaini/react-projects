import styles from "./Home.module.css";

export default function Home() {
  return (
    <main className={styles.home}>
      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          Create trips, map out the cities you want to visit, and follow the
          perfect route. Keep track of your expenses, packing list, and every
          day of your journey—all in one place. Never miss a detail of your
          travels and share your adventures with friends.
        </h2>
      </section>
    </main>
  );
}
