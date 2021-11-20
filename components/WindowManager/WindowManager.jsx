import { useState } from "react";

import Window from "../Window";
import Tray from "../Tray";

import styles from "./WindowManager.module.scss";

export default function WindowManager(props) {
  const [apps, setApps] = useState([]);

  const getNextHighestZIndex = () => {
    var current_max = 0;
    for (var i in apps) {
      if (apps[i].zIndex >= current_max) {
        current_max = apps[i].zIndex;
      }
    }
    return current_max + 1;
  };

  const launchApp = (appName) => {
    // setApps([...apps, {}])
    apps[appName] = {
      isminimsed: false,
      zIndex: getNextHighestZIndex(),
    };
    setApps(apps);
    focusApp(appName);
  };

  const destroyApp = (appName) => {
    delete apps[appName];
    setApps(apps);
  };

  const minimseApp = (appName) => {
    apps[appName].isminimsed = true;
    apps[appName].hasFocus = false;
    setApps(apps);
  };

  const maximisApp = (appName) => {
    apps[appName].isMaximised = true;
    setApps(apps);
    focusApp(appName);
  };

  const compressApp = (appName) => {
    apps[appName].isMaximised = false;
    setApps(apps);
    // focusApp(appName);
  };

  const focusApp = (appName) => {
    /* Unminimse app and bring to the top */
    apps[appName].isminimsed = false;
    apps[appName].zIndex = getNextHighestZIndex() + 1;

    for (var key in apps) {
      apps[key].hasFocus = false;
    }
    apps[appName].hasFocus = true;
    setApps(apps);
  };
  return (
    <div className={styles.window_manager}>
      {/* Windows */}
      {apps.map((item, index) => {
        if (apps[item.name] && !apps[item.name].mode === "minimised") {
          return (
            <Window
              key={index}
              title={item.title}
              icon={item.icon}
              closable={item.closable}
              maximisable={item.maximisable}
              hasFocus={apps[item.name].hasFocus}
              width={item.width}
              height={item.height}
              lockAspectRatio={item.lockAspectRatio}
              isMaximised={apps[item.name].isMaximised}
              zIndex={apps[item.name].zIndex}
              onClickminimse={() => minimseApp(item.name)}
              onClickMaximis={() => maximisApp(item.name)}
              onClickCompress={() => compressApp(item.name)}
              onClickClose={() => destroyApp(item.name)}
              onMouseDown={() => focusApp(item.name)}
            >
              {item.component}
            </Window>
          );
        }
        return null;
      })}
      <Tray
        apps={props.installed_apps.map((installed_app) => ({
          title: installed_app.title,
          icon: installed_app.icon,
          hasFocus: false,
          onClick: () => launchApp(installed_app.name),
        }))}
      />
    </div>
  );
}
