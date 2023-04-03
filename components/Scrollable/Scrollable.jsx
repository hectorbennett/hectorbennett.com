import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import styles from "./Scrollable.module.scss";

const ScrollableBase = forwardRef(function Scrollable(props, ref) {
  const { scroll, className, nodeType, ..._props } = props;
  var classNames = [styles.scrollable, styles[scroll]];
  if (className) {
    classNames.push(className);
  }
  return <props.nodeType ref={ref} {..._props} className={classNames.join(" ")} />;
});

ScrollableBase.propTypes = {
  scroll: PropTypes.oneOf(["x", "y", "both"]),
  className: PropTypes.string,
  nodeType: PropTypes.string,
};

ScrollableBase.defaultProps = {
  scroll: "y",
  nodeType: "div",
};

const ScrollableTextArea = forwardRef(function ScrollableTextArea(props, ref) {
  return <ScrollableBase ref={ref} nodeType="textarea" {...props} />;
});

const out = {
  div: ScrollableBase,
  textarea: ScrollableTextArea,
};

export default out;
