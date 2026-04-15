import styles from "./Button.module.css";

export default function Button({ children, className, onClick }) {
  return (
    <button onClick={onClick} className={`${styles[className]}`}>
      {children}
    </button>
  );
}
