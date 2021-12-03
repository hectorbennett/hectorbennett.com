import styles from "./WorldWar.module.scss";
import SvgTooltip from "../SVGTooltip";

export default function Landmass(props) {
  const tooltip =
    props.country?.name === props.landmass.original_country
      ? props.country?.name
      : `${props.country?.name} occupied ${props.landmass.original_country}`;
  return (
    <>
      <SvgTooltip tooltip={tooltip}>
        <path
          className={styles.country}
          d={props.landmass.shape}
          style={{ fill: props.country?.color }}
        ></path>
      </SvgTooltip>
    </>
  );
}
