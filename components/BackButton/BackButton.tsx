import Link from "next/link";
import styles from "./BackButton.module.scss";

export default function BackButton({ href }: { href: string }) {
  return (
    <Link href={href} className={styles.back_button}>
      ← Back
    </Link>
  );
}
