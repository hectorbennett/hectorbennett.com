import styles from "./WorldWar.module.scss";
import SvgTooltip from "../SVGTooltip";

function Tooltip(props) {
  return (
    <>
      <div>{props.original_country}</div>
      {props.country && props.country !== props.original_country ? (
        <div>Occupied by {props.country}</div>
      ) : null}
    </>
  );
}

export default function Landmass(props) {
  return (
    <>
      <SvgTooltip
        tooltip={
          <Tooltip
            country={props.country.name}
            original_country={props.landmass.original_country}
          />
        }
      >
        <path
          className={styles.country}
          d={props.landmass.shape}
          style={{ fill: props.country?.color }}
        ></path>
      </SvgTooltip>
    </>
  );
}
