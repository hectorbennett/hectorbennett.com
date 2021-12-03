import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

import styles from "./SvgTooltip.module.scss";

const svgPoint = (svg, e) => {
  if (svg.createSVGPoint) {
    let point = svg.createSVGPoint();
    point.x = e.clientX;
    point.y = e.clientY;
    point = point.matrixTransform(svg.getScreenCTM().inverse());
    return { x: point.x, y: point.y };
  }
  const rect = svg.getBoundingClientRect();
  return {
    x: e.clientX - rect.left - svg.clientLeft,
    y: e.clientY - rect.top - svg.clientTop,
  };
};

function Tooltip(props) {
  if (!props.svg) {
    return;
  }
  return createPortal(
    <g
      className={styles.tooltip}
      transform={`translate(${props.position.x}, ${props.position.y})`}
    >
      <rect x="0" y="0" width="100" height="100" fill="red"></rect>
      <text x="0" y="50" fill="blue">
        {props.children}
      </text>
    </g>,
    props.svg
  );
}

export default function SvgTooltip(props) {
  const ref = useRef();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  return (
    <g
      ref={ref}
      onMouseEnter={() => {
        console.log("mouse enter");
        setIsVisible(true);
      }}
      onMouseLeave={() => {
        console.log("mouse leave");
        setIsVisible(false);
      }}
      onMouseMove={(e) => {
        setPosition(svgPoint(ref.current.viewportElement, e));
        console.log(position);
      }}
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
