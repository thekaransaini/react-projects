import styles from "./Button.module.css";

export default function Button({ children, className }) {
  return <div className={`${styles[className]}`}>{children}</div>;
}
