import { useEffect } from "react";
import useTransition from "react-transition-state";
import styles from "./Card.module.scss";

export default function Card(props) {
  const [state, toggle] = useTransition({
    timeout: 100,
  });

  useEffect(() => {
    toggle();
  }, []);

  const stateClasses = {
    unmounted: styles.unmounted,
    entering: styles.entering,
    entered: styles.entered,
    exiting: styles.exiting,
    exited: styles.exited,
  };

  return (
    <div className={`${styles.card} ${stateClasses[state] || ""}`} {...props}>
      {props.children}
    </div>
  );
}
