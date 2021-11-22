import { useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import styles from "./WindowWrapper.module.scss";

export default function WindowWrapper(props) {
  const [component, setComponent] = useState(null);
  const [classNames, setClassNames] = useState([styles.window_wrapper]);
  const [isMaximised, setIsMaximised] = useState(props.isMaximised);
  const [isMinimised, setIsMinimised] = useState(props.isMinimised);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({
    width: props.width,
    height: props.height,
  });

  useEffect(() => {
    setPosition({
      x: window.innerWidth - props.width - 100,
      y: window.innerHeight - props.height - 100,
    });
  }, []);

  useEffect(() => {
    setClassNames([styles.window_wrapper, styles.transitioning]);
    setTimeout(() => {
      setIsMaximised(props.isMaximised);
      setTimeout(() => {
        setClassNames([styles.window_wrapper]);
      }, 200);
    }, 1);
  }, [props.isMaximised]);

  useEffect(() => {
    setClassNames([styles.window_wrapper, styles.transitioning]);
    setTimeout(() => {
      setIsMinimised(props.isMinimised);
      setTimeout(() => {
        setClassNames([styles.window_wrapper]);
      }, 200);
    }, 1);
  }, [props.isMinimised]);

  console.log(props.isMinimised);

  useEffect(() => {
    setComponent(
      <Rnd
        className={classNames.join(" ")}
        default={{
          x: window.innerWidth - props.width - 100,
          y: window.innerHeight - props.height - 100,
          width: props.width,
          height: props.height,
        }}
        lockAspectRatio={props.lockAspectRatio}
        dragHandleClassName={props.dragHandleClassName}
        disableDragging={isMaximised}
        onDragStop={(e, d) => {
          setPosition(d);
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          setSize({ width: ref.style.width, height: ref.style.height });
          setPosition(position);
        }}
        size={
          isMaximised
            ? { width: "100vw", height: "100vh" }
            : isMinimised
            ? { width: 50, height: 50 }
            : size
        }
        position={
          isMaximised
            ? { x: 0, y: 0 }
            : isMinimised
            ? { y: window.innerHeight / 2, x: window.innerWidth + 100 }
            : position
        }
        minWidth={props.isMinimised ? null : props.minWidth}
        minHeight={props.isMinimised ? null : props.minHeight}
        style={{
          zIndex: props.zIndex,
          opacity: isMinimised ? 0.2 : 1,
        }}
      >
        {props.children}
      </Rnd>
    );
  });
  return component;
}

WindowWrapper.defaultProps = {
  width: 300,
  height: 300,
  minWidth: 300,
  minHeight: 200,
};
