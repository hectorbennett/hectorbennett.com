import React from "react";

import styles from "./WorldWar.module.scss";

export default function Landmass(props) {
  return (
    <path
      className={styles.country}
      d={props.shape}
      style={{ fill: props.colour }}
    >
      <title>
        {props.original_country_name === props.new_country_name
          ? props.new_country_name
          : `${props.new_country_name} occupied ${props.original_country_name}`}
      </title>
    </path>
  );
}
