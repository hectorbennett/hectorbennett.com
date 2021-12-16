import { useRef, useState } from "react";
import styles from "./Grid.module.scss";

import useResizeObserver from "../../utils/useResizeObserver";

const sizes = [
  ["xl", 1200],
  ["lg", 992],
  ["md", 768],
  ["sm", 576],
];

const getSizeFromWidth = (width) => {
  for (let i in sizes) {
    if (width >= sizes[i][1]) {
      return sizes[i][0];
    }
  }
  return "xs";
};

export function Grid(props) {
  const ref = useRef();
  const [width, setWidth] = useState(0);
  useResizeObserver(ref, (entries) => {
    entries.forEach((entry) => {
      setWidth(entry.contentRect.width);
    });
  });

  const classNames = [styles.grid, styles[getSizeFromWidth(width)]];

  return (
    <div className={classNames.join(" ")} ref={ref}>
      {props.children}
    </div>
  );
}

export function Row(props) {
  return <div className={styles.row}>{props.children}</div>;
}

export function Col(props) {
  var classNames = [styles.col];
  ["xs", "sm", "md", "lg", "xl"].forEach((s) => {
    if (props[s]) {
      classNames.push(styles[`col-${s}-${props[s]}`]);
    }
  });
  return <div className={classNames.join(" ")}>{props.children}</div>;
}

Col.defaultProps = {
  xs: 12,
};
