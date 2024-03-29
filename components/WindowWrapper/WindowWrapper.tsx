// todo: use react-transition-state instead of all the setTimeout bits
import React from "react";
import { useLayoutEffect, useEffect, useState, useCallback, ReactNode } from "react";
import { Rnd } from "react-rnd";
import styles from "./WindowWrapper.module.scss";

const randomIntFromInterval = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

interface WindowWrapperProps {
  width: number;
  height: number;
  isMaximised: boolean;
  isMinimised: boolean;
  isOpen: boolean;
  lockAspectRatio: boolean;
  dragHandleClassName: string;
  minWidth: number;
  minHeight: number;
  zIndex: number;
  onMouseDown: () => void;
  children: ReactNode;
}

interface Position {
  x: number;
  y: number;
}

export default function WindowWrapper(props: WindowWrapperProps) {
  // const [component, setComponent] = useState(null);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [classNames, setClassNames] = useState<Array<string>>([styles.window_wrapper]);
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

  const getValidPosition = useCallback(
    (position: Position) => {
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
    },
    [size.width],
  );

  const handleWindowResize = useCallback(() => {
    setPosition((position) => getValidPosition(position));
  }, [getValidPosition]);

  useLayoutEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [handleWindowResize]);

  useEffect(() => {
    setPosition({
      x: Math.max(window.innerWidth - props.width - randomIntFromInterval(100, 150), 50),
      y: Math.max(window.innerHeight - props.height - randomIntFromInterval(100, 150), 50),
    });
  }, [props.height, props.width]);

  function addClassName(className: string) {
    setClassNames((c) => [...new Set(c.concat([className]))]);
  }

  function removeClassName(className: string) {
    setClassNames((c) => c.filter((c) => c !== className));
  }

  useEffect(() => {
    if (props.isOpen) {
      setTimeout(() => {
        addClassName(styles.open);
      }, 300);
    } else {
      removeClassName(styles.open);
    }
  }, [props.isOpen]);

  useEffect(() => {
    setTimeout(() => {
      addClassName(styles.transitioning);
      setTimeout(() => {
        setIsMaximised(props.isMaximised);
        setTimeout(() => {
          removeClassName(styles.transitioning);
        }, 200);
      }, 50);
    }, 50);
  }, [props.isMaximised]);

  useEffect(() => {
    setTimeout(() => {
      addClassName(styles.transitioning);
      setTimeout(() => {
        setIsMinimised(props.isMinimised);
        setTimeout(() => {
          removeClassName(styles.transitioning);
        }, 200);
      }, 50);
    }, 50);
  }, [props.isMinimised]);

  return (
    <Rnd
      className={classNames.join(" ")}
      default={{
        width: props.width,
        height: props.height,
        x: 0,
        y: 0,
      }}
      lockAspectRatio={props.lockAspectRatio}
      dragHandleClassName={props.dragHandleClassName}
      disableDragging={isMaximised || isMobileDevice}
      onDragStop={(e, d) => {
        setPosition(getValidPosition(d));
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        setSize({ width: parseInt(ref.style.width), height: parseInt(ref.style.height) });
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
      minWidth={isMinimised ? undefined : props.minWidth}
      minHeight={isMinimised ? undefined : props.minHeight}
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
}

WindowWrapper.defaultProps = {
  width: 300,
  height: 300,
  minWidth: 300,
  minHeight: 200,
};
