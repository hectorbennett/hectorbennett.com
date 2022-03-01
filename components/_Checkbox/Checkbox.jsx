import styles from "./Checkbox.module.scss";
import { CgCheck } from "react-icons/cg";

export default function Checkbox(props) {
  return (
    <span className={styles.checkbox_outer}>
      <input className={styles.checkbox} type="checkbox" {...props} />
      <span className={styles.check}>
        <CgCheck />
      </span>
    </span>
  );
}

Checkbox.label = ({ label, children }) => {
  <label className={styles.checkbox_label}>
    {children}
    <span>{label}</span>
  </label>;
};
