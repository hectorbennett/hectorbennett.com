import styles from "./Layout.module.scss";

export default function Section({ className = "", ...props }) {
  const classNames = [styles.section];
  if (className) {
    classNames.push(className);
  }
  return (
    <section className={classNames.join(" ")} {...props}>
      {props.children}
    </section>
  );
}
