import styles from "./Button.module.css";

export default function Button({ children, className, handleToggle }) {
  return (
    <button onClick={() => handleToggle()} className={`${styles[className]}`}>
      {children}
    </button>
  );
}
