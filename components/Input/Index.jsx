import styles from "./Input.module.scss";

export default function Input(props) {
  const classNames = [styles.input];
  if (props.error) {
    classNames.push(styles.error);
  }
  return (
    <label className={classNames.join(" ")}>
      <span className={styles.label}>{props.label}</span>
      <input {...props} />
      {props.error ? <span className={styles.error}>{props.error}</span> : null}
    </label>
  );
}
