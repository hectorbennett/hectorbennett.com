import { useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import styles from "./WindowWrapper.module.scss";

export default function WindowWrapper(props) {
  const [component, setComponent] = useState(null);
  const [classNames, setClassNames] = useState([styles.window_wrapper]);
  const [isMaximised, setIsMaximised] = useState(props.isMaximised);
  const [isMinimised, setIsMinimised] = useState(props.isMinimised);
  const [position, setPosition] = useState({ x: 0, y: 0 });

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
        position={
          isMaximised
            ? { x: 0, y: 0 }
            : isMinimised
            ? { y: window.innerHeight / 2, x: window.innerWidth }
            : position
        }
        minWidth={isMaximised ? "100vw" : props.minWidth}
        minHeight={isMaximised ? "100vh" : props.minHeight}
        style={{
          zIndex: props.zIndex,
        }}
      >
        {props.children}
      </Rnd>
    );
  }, [classNames, isMaximised, isMinimised, position, props]);
  return component;
}

WindowWrapper.defaultProps = {
  width: 300,
  height: 300,
  minWidth: 300,
  minHeight: 200,
};
