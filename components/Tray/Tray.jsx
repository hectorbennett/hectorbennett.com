import styles from "./Tray.module.scss";

function TrayItem(props) {
  const classNames = [styles.tray_item];
  if (props.hasFocus) {
    classNames.push(styles.focused);
  }
  if (props.isOpen) {
    classNames.push(styles.isOpen);
  }

  return (
    <div className={classNames.join(" ")}>
      <button className={styles.tray_item_button} onClick={props.onClick} tabIndex="0">
        <div className={styles.tooltip}>{props.title}</div>
        <div className={styles.icon}>{props.icon}</div>
      </button>
      <div className={styles.open_indicator} />
    </div>
  );
}

export default function Tray(props) {
  return (
    <div className={styles.tray}>
      {props.apps.map((item, index) => {
        return (
          <TrayItem
            key={index}
            icon={item.icon}
            title={item.title}
            hasFocus={item.hasFocus}
            isOpen={item.isOpen}
            onClick={item.onClick}
          />
        );
      })}
    </div>
  );
}
