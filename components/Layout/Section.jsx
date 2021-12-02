import styles from "./Layout.module.scss";

export default function Section(props) {
  return (
    <section className={styles.section} {...props}>
      {props.children}
    </section>
  );
}
