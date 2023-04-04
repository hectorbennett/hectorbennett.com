import Scrollable from "../Scrollable";

export default function TextArea(props) {
  const classNames = [styles.input];
  if (props.error) {
    classNames.push(styles.error);
  }
  return (
    <label className={classNames.join(" ")}>
      <span className={styles.label}>{props.label}</span>
      <Scrollable.textarea {...props} />
      {props.error ? <span className={styles.error}>{props.error}</span> : null}
    </label>
  );
}
