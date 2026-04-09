import styles from "./Dropdown.module.css";

export default function Dropdown({
  options,
  dropDownStyles = {
    fontSize: "1rem",
    padding: "0.4rem 0.8rem",
    borderRadius: "0.4rem",
    border: "1px solid var(--border)",
  },
}) {
  return (
    <select className={styles.dropdown} style={dropDownStyles}>
      {options.map((option) => (
        <option>{option}</option>
      ))}
      {/* <option value="">Viewer</option>
      <option value="">Admin</option> */}
    </select>
  );
}
