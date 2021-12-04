import { useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import styles from "./WindowWrapper.module.scss";

const randomIntFromInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export default function WindowWrapper(props) {
  const [component, setComponent] = useState(null);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [classNames, setClassNames] = useState([styles.window_wrapper]);
  const [isMaximised, setIsMaximised] = useState(props.isMaximised);
  const [isMinimised, setIsMinimised] = useState(props.isMinimised);
  const [position, setPosition] = useState({
    x: randomIntFromInterval(50, 200),
    y: randomIntFromInterval(50, 200),
  });
  const [size, setSize] = useState({
    width: props.width,
    height: props.height,
  });

  useEffect(() => {
    if (/Mobi/.test(navigator.userAgent)) {
      setIsMobileDevice(true);
    }
  }, []);

  useEffect(() => {
    setPosition({
      x: window.innerWidth - props.width - randomIntFromInterval(100, 150),
      y: window.innerHeight - props.height - randomIntFromInterval(100, 150),
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setClassNames([styles.window_wrapper, styles.transitioning]);
      setTimeout(() => {
        setIsMaximised(props.isMaximised);
        setTimeout(() => {
          setClassNames([styles.window_wrapper]);
        }, 200);
      }, 10);
    }, 10);
  }, [props.isMaximised]);

  useEffect(() => {
    setTimeout(() => {
      setClassNames([styles.window_wrapper, styles.transitioning]);
      setTimeout(() => {
        setIsMinimised(props.isMinimised);
        setTimeout(() => {
          setClassNames([styles.window_wrapper]);
        }, 200);
      }, 10);
    }, 10);
  }, [props.isMinimised]);

  useEffect(() => {
    setComponent(
      <Rnd
        className={classNames.join(" ")}
        default={{
          width: props.width,
          height: props.height,
        }}
        lockAspectRatio={props.lockAspectRatio}
        dragHandleClassName={props.dragHandleClassName}
        disableDragging={isMaximised || isMobileDevice}
        onDragStop={(e, d) => {
          setPosition(d);
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          setSize({ width: ref.style.width, height: ref.style.height });
          setPosition(position);
        }}
        size={
          isMinimised
            ? { width: 50, height: 50 }
            : isMaximised || isMobileDevice
            ? { width: "100vw", height: "100vh" }
            : size
        }
        position={
          isMinimised
            ? { y: window.innerHeight / 2, x: window.innerWidth - 50 }
            : isMaximised || isMobileDevice
            ? { x: 0, y: 0 }
            : position
        }
        minWidth={isMinimised ? null : props.minWidth}
        minHeight={isMinimised ? null : props.minHeight}
        maxWidth="100vw"
        maxHeight="100vh"
        style={{
          zIndex: props.zIndex,
          opacity: isMinimised ? 0 : 1,
        }}
        onMouseDown={props.onMouseDown}
      >
        {props.children}
      </Rnd>
    );
  }, [
    classNames,
    isMaximised,
    isMobileDevice,
    isMinimised,
    position,
    size,
    props,
  ]);
  return component;
}

WindowWrapper.defaultProps = {
  width: 300,
  height: 300,
  minWidth: 300,
  minHeight: 200,
};
