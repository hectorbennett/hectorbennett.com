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

function TopBar(props) {
  return (
    <div className={styles.top_bar}>
      <div className={styles.icon}>{props.icon}</div>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.control_buttons}>
        {/* Minimise button */}
        <button
          className={styles.control_button}
          onClick={props.onClickMinimise}
          tabIndex={props.hasFocus ? "0" : "-1"}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        {/* Maximise button */}
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

        {/* Close button */}
        {props.closable ? (
          <button
            className={styles.control_button}
            onClick={props.onClickClose}
            tabIndex={props.hasFocus ? "0" : "-1"}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default function Window(props) {
  const contentRef = useRef(null);
  const classNames = [styles.window];
  if (props.hasFocus) {
    classNames.push(styles.focused);
  }
  return (
    <WindowWrapper
      width={props.width}
      height={props.height}
      lockAspectRatio={props.lockAspectRatio}
      dragHandleClassName={styles.top_bar}
      isMaximised={props.mode === "maximised"}
      isMinimised={props.isMinimised}
      zIndex={props.zIndex}
    >
      <div className={classNames.join(" ")} onMouseDown={props.onMouseDown}>
        <TopBar
          mode={props.mode}
          icon={props.icon}
          title={props.title}
          hasFocus={props.hasFocus}
          maximisable={props.maximisable}
          closable={props.closable}
          onClickClose={props.onClickClose}
          onClickMaximise={props.onClickMaximise}
          onClickMinimise={props.onClickMinimise}
          onClickCompress={props.onClickCompress}
        />
        <div className={styles.content} ref={contentRef}>
          {props.children}
        </div>
      </div>
    </WindowWrapper>
  );
}

Window.propTypes = {
  mode: PropTypes.oneOf(["maximised", "normal"]),
  isMinimised: PropTypes.bool,
};

Window.defaultProps = {
  minimisable: true,
  maximisable: true,
  closable: true,
  mode: "normal",
};
