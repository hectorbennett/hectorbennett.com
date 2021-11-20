import { useEffect, useState } from "react";
import { Rnd } from "react-rnd";

export default function WindowWrapper(props) {
  const [component, setComponent] = useState(null);

  useEffect(() => {
    setComponent(
      <Rnd
        default={{
          x: window.innerWidth - props.width - 100,
          y: window.innerHeight - props.height - 100,
          width: props.width,
          height: props.height,
        }}
        lockAspectRatio={props.lockAspectRatio}
        dragHandleClassName={props.dragHandleClassName}
        disabled={props.isMaximised}
        position={
          props.isMaximised ? { x: coordinates.x, y: coordinates.y } : null
        }
        style={{
          zIndex: props.zIndex,
        }}
      >
        {props.children}
      </Rnd>
    );
  }, []);
  return component;
}

WindowWrapper.defaultProps = {
  width: 300,
  height: 300,
};
