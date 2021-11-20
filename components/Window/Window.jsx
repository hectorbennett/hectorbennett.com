import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faMinus,
  faExpandAlt,
  faCompressAlt,
} from "@fortawesome/free-solid-svg-icons";

import WindowWrapper from "../WindowWrapper";

import styles from "./Window.module.scss";

export default function Window(props) {
  const contentRef = useRef(null);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setCoordinates({ x: window.innerWidth - 500, y: window.innerHeight - 500 });
    setIsOpen(true);
  }, []);

  const classNames = [styles.window];
  if (props.hasFocus) {
    classNames.push(styles.focused);
  }
  if (props.mode === "minimised") {
    classNames.push(styles.minimised);
  } else if (props.mode === "maximised") {
    classNames.push(styles.maximised);
  }

  return (
    <WindowWrapper
      lockAspectRatio={props.lockAspectRatio}
      dragHandleClassName={styles.top_bar}
      isMaximised={props.mode === "maximised"}
      style={{
        zIndex: props.zIndex,
      }}
    >
      <div className={classNames.join(" ")} onMouseDown={props.onMouseDown}>
        <div className={styles.top_bar}>
          <div className={styles.icon}>{props.icon}</div>
          <div className={styles.title}>{props.title}</div>
          <div className={styles.control_buttons}>
            <button
              className={styles.control_button}
              onClick={() => {
                setIsOpen(false);
                setTimeout(() => {
                  props.onClickminimse();
                }, 200);
              }}
              tabIndex={props.hasFocus ? "0" : "-1"}
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>

            {props.mode === "maximised" ? (
              <button
                className={styles.control_button}
                onClick={props.onClickCompress}
                tabIndex={props.hasFocus ? "0" : "-1"}
              >
                <FontAwesomeIcon icon={faCompressAlt} />
              </button>
            ) : props.maximisable ? (
              <button
                className={styles.control_button}
                onClick={props.onClickMaximise}
                tabIndex={props.hasFocus ? "0" : "-1"}
              >
                <FontAwesomeIcon icon={faExpandAlt} />
              </button>
            ) : null}

            {props.closable ? (
              <button
                className={styles.control_button}
                onClick={() => {
                  setIsOpen(false);
                  setTimeout(() => {
                    props.onClickClose();
                  }, 200);
                }}
                tabIndex={props.hasFocus ? "0" : "-1"}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            ) : null}
          </div>
        </div>

        <div
          className={styles.content}
          // onClick={handleContentClick}
          ref={contentRef}
        >
          {props.children}
        </div>
      </div>
    </WindowWrapper>
  );
}

Window.propTypes = {
  mode: PropTypes.oneOf(["minimised", "maximised", "normal"]),
};

Window.defaultProps = {
  minimisable: true,
  maximisable: true,
  closable: true,
  mode: "normal",
};
