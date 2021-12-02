import React from "react";

import styles from "./WorldWar.module.scss";

export default function Landmass(props) {
  return (
    <path
      className={styles.country}
      id={props.country.iso_a2}
      d={props.landmass.shape}
      // onMouseEnter={props.onMouseEnter}
      style={{ fill: props.country.color }}
    >
      <title>
        {props.country.name === props.landmass.original_country
          ? props.country.name
          : `${props.country.name} occupied ${props.landmass.original_country}`}
      </title>
    </path>
  );
}
