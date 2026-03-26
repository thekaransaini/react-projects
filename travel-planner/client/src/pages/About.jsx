import styles from "./About.module.css";

export default function About() {
  return (
    <main className={styles.about}>
      <section>
        <img
          src="/img1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About Travel Planner.</h2>
          <p>
            Travel Planner is a simple web application designed to help
            travelers organize and remember their journeys around the world.
          </p>
          <p>
            With Travel Planner, you can add cities to your trip, visualize them
            on a world map. The app also allows you to manage your travel
            expenses with different currencies, making it easier to understand
            how much you spend during a trip.
          </p>
          <p>
            To make travel preparation easier, the app includes a packing
            checklist where you can list and mark important items.
          </p>
        </div>
      </section>
    </main>
  );
}
