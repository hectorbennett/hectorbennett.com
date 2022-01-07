import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTransition } from "react-transition-state";
import classNames from "classnames";

import {
  CgClose,
  CgMathMinus,
  CgCompressRight,
  CgExpand,
} from "react-icons/cg";

import WindowWrapper from "../WindowWrapper";

import useClickOutside from "../../utils/useClickOutside";

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
          <CgMathMinus />
        </button>
        {/* Maximise button */}
        {props.mode === "maximised" ? (
          <button
            className={styles.control_button}
            onClick={props.onClickCompress}
            tabIndex={props.hasFocus ? "0" : "-1"}
          >
            <CgCompressRight />
          </button>
        ) : props.maximisable ? (
          <button
            className={styles.control_button}
            onClick={props.onClickMaximise}
            tabIndex={props.hasFocus ? "0" : "-1"}
          >
            <CgExpand />
          </button>
        ) : null}

        {/* Close button */}
        {props.closable ? (
          <button
            className={styles.control_button}
            onClick={props.onClickClose}
            tabIndex={props.hasFocus ? "0" : "-1"}
          >
            <CgClose />
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default function Window(props) {
  const ref = useRef(null);
  const contentRef = useRef(null);

  useClickOutside(ref, props.onClickOutside);

  const [state, toggle] = useTransition({
    timeout: { enter: 0, exit: 300 },
    mountOnEnter: true,
    unmountOnExit: true,
  });
  const stateClasses = {
    unmounted: styles.unmounted,
    entering: styles.entering,
    entered: styles.entered,
    exiting: styles.exiting,
    exited: styles.exited,
  };
  const className = classNames({
    [styles.window]: true,
    [stateClasses[state]]: true,
    [styles.focused]: props.hasFocus,
  });

  useEffect(() => {
    toggle(props.isOpen === true);
  }, [props.isOpen]);

  if (state === "unmounted") {
    return null;
  }

  return (
    <WindowWrapper
      width={props.width}
      height={props.height}
      lockAspectRatio={props.lockAspectRatio}
      dragHandleClassName={styles.top_bar}
      isOpen={state === "open"}
      isMaximised={props.mode === "maximised"}
      isMinimised={props.isMinimised}
      zIndex={props.zIndex}
      onMouseDown={props.onMouseDown}
    >
      <div className={className} ref={ref}>
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
