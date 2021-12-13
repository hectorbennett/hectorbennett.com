import { useLayoutEffect, useEffect, useState } from "react";
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

  useLayoutEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const handleWindowResize = () => {
    setPosition((position) => getValidPosition(position));
  };

  useEffect(() => {
    setPosition({
      x: Math.max(
        window.innerWidth - props.width - randomIntFromInterval(100, 150),
        50
      ),
      y: Math.max(
        window.innerHeight - props.height - randomIntFromInterval(100, 150),
        50
      ),
    });
  }, []);

  function addClassName(className) {
    setClassNames((c) => [...new Set(c.concat([className]))]);
  }

  function removeClassName(className) {
    setClassNames((c) => c.filter((c) => c !== className));
  }

  useEffect(() => {
    setTimeout(() => {
      addClassName(styles.open);
    }, 300)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      addClassName(styles.transitioning);
      setTimeout(() => {
        setIsMaximised(props.isMaximised);
        setTimeout(() => {
          removeClassName(styles.transitioning);
        }, 200);
      }, 10);
    }, 10);
  }, [props.isMaximised]);

  useEffect(() => {
    setTimeout(() => {
      addClassName(styles.transitioning);
      setTimeout(() => {
        setIsMinimised(props.isMinimised);
        setTimeout(() => {
          removeClassName(styles.transitioning);
        }, 200);
      }, 10);
    }, 10);
  }, [props.isMinimised]);

  const getValidPosition = (position) => {
    const newPosition = { x: position.x, y: position.y };
    if (position.y < 0) {
      newPosition.y = 0;
    } else if (position.y > window.innerHeight) {
      newPosition.y = window.innerHeight - 50;
    }
    if (position.x < -size.width + 50) {
      newPosition.x = -size.width + 100;
    } else if (position.x > window.innerWidth) {
      newPosition.x = window.innerWidth - 50;
    }
    return newPosition;
  };

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
          setPosition(getValidPosition(d));
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          setSize({ width: ref.style.width, height: ref.style.height });
          setPosition(getValidPosition(position));
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
        // bounds="window"
        enableUserSelectHack={true}
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
