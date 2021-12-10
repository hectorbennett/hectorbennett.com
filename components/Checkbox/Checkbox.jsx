import styles from "./Checkbox.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function Checkbox(props) {
  return (
    <span className={styles.checkbox_outer}>
      <input className={styles.checkbox} type="checkbox" {...props} />
      <span className={styles.check}>
        <FontAwesomeIcon icon={faCheck} />
      </span>
    </span>
  );
}
