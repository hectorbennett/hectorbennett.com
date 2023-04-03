import { useState, useRef } from "react";
import { createPortal } from "react-dom";

import styles from "./SvgTooltip.module.scss";

const svgPoint = (svg, e) => {
  const rect = svg.getBoundingClientRect();
  return {
    x: e.clientX - rect.x,
    y: e.clientY - rect.y,
  };
};

function Tooltip(props) {
  if (!props.svg) {
    return;
  }
  return createPortal(
    <div
      className={styles.tooltip_outer}
      style={{
        transform: `translate(${props.position.x}px, ${props.position.y}px)`,
      }}
    >
      <div className={styles.tooltip}>{props.children}</div>
    </div>,
    props.svg.parentElement,
  );
}

export default function SvgTooltip(props) {
  const ref = useRef();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  return (
    <g
      ref={ref}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onMouseMove={(e) => setPosition(svgPoint(ref.current.viewportElement, e))}
    >
      {props.children}
      {isVisible ? (
        <Tooltip svg={ref.current?.viewportElement} position={position}>
          {props.tooltip}
        </Tooltip>
      ) : null}
    </g>
  );
}
