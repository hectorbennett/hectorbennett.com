import styles from "./WorldWar.module.scss";

export default function Landmass(props) {
  return (
    <>
      <path
        className={styles.country}
        d={props.landmass.shape}
        style={{ fill: props.country?.color }}
      >
        <title>
          {props.country?.name === props.landmass.original_country
            ? props.country?.name
            : `${props.country?.name} occupied ${props.landmass.original_country}`}
        </title>
      </path>
    </>
  );
}
