import { useEffect, useRef, useState } from "react";
import { SpinningGears } from "@hectorbennett/webgldemos";
import styles from "./ScreenSaver.module.scss";

export default function ScreenSaver(props) {
  const ref = useRef();
  const [inactive, setInactive] = useState(false);
  const [size, setSize] = useState({ height: 400, width: 400 });

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setSize({
          height: entry.contentRect.height,
          width: entry.contentRect.width,
        });
      });
    });
    const element = ref.current;
    observer.observe(element);
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    var timer;
    function startTimer() {
      timer = window.setTimeout(() => setInactive(true), 15000);
    }
    function resetTimer() {
      setInactive(false);
      window.clearTimeout(timer);
      startTimer();
    }
    document.addEventListener("mousemove", resetTimer, false);
    document.addEventListener("mousedown", resetTimer, false);
    document.addEventListener("keypress", resetTimer, false);
    document.addEventListener("touchmove", resetTimer, false);
  });

  return (
    <div className={styles.screensaver} ref={ref}>
      {inactive ? (
        <SpinningGears
          className={styles.screensaver_inner}
          width={size.width}
          height={size.height}
        />
      ) : null}
    </div>
  );
}
