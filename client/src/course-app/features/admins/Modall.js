import styles from "./Modall.module.css";
export default function Modall({ children }) {
  return <div className={styles["modal-container"]}>{children}</div>;
}
