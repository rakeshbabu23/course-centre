import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
export default function Navbar({ children }) {
  const navigate = useNavigate();
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <h4>COURSE CENTRE</h4>
      </div>
      <div>{children}</div>
    </nav>
  );
}
