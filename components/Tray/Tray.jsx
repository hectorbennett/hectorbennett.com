import styles from "./Tray.module.scss";

function TrayItem(props) {
  const classNames = [styles.tray_item];
  if (props.focused) {
    classNames.push(styles.focused);
  }

  return (
    <button
      className={classNames.join(" ")}
      onClick={props.onClick}
      tabIndex="0"
    >
      <div className={styles.tooltip}>{props.title}</div>
      <div className={styles.icon}>{props.icon}</div>
    </button>
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
            onclick={() => console.log("click")}
            //   onClick={() => focusApp(item.name)}
          />
        );
      })}
    </div>
  );
}
