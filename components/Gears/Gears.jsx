import { useEffect, useRef, useState } from "react";
import { WebGLGears } from "@hectorbennett/webgldemos";
import styles from "./Gears.module.scss";

export default function Gears(props) {
  const ref = useRef();
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
  return (
    <div className={styles.gears} ref={ref}>
      <WebGLGears width={size.width} height={size.height} />
    </div>
  );
}
