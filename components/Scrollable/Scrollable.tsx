import React, { forwardRef } from "react";
import Polymorphic, { PolymorphicRef } from "../Polymorphic/Polymorphic";
import styles from "./Scrollable.module.scss";

interface ScrollableProps {
  scroll?: "x" | "y" | "both";
  className?: string;
  style?: object;
  children?: React.ReactNode;
}

interface BaseScrollableProps extends ScrollableProps {
  tag?: "div" | "textarea";
}

export const ScrollableBase = forwardRef(function ScrollableBase(
  { tag = "div", scroll = "y", className, ...props }: BaseScrollableProps,
  ref?: PolymorphicRef<React.ElementType>,
) {
  var classNames = [styles.scrollable, styles[scroll]];
  if (className) {
    classNames.push(className);
  }

  return <Polymorphic ref={ref} tag={tag} className={classNames.join(" ")} {...props} />;
});

const ScrollableTextArea = forwardRef(function ScrollableTextArea(props: ScrollableProps, ref) {
  return <ScrollableBase ref={ref} tag="textarea" {...props} />;
});

const out = {
  div: ScrollableBase,
  textarea: ScrollableTextArea,
};

export default out;
