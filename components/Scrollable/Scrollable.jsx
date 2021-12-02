import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import styles from "./Scrollable.module.scss";

const Scrollable = forwardRef(function Scrollable(props, ref) {
  const { scroll, className, ..._props } = props;
  var classNames = [styles.scrollable, styles[scroll]];
  if (className) {
    classNames.push(className);
  }
  return <div ref={ref} {..._props} className={classNames.join(" ")} />;
});

Scrollable.propTypes = {
  scroll: PropTypes.oneOf(["x", "y", "both"]),
  className: PropTypes.string,
};

Scrollable.defaultProps = {
  scroll: "y",
};

export default Scrollable;
