import { useState } from "react";

import Window from "../Window";
import Tray from "../Tray";

import styles from "./WindowManager.module.scss";

export default function WindowManager(props) {
  const [apps, setApps] = useState(props.installed_apps);

  const getNextHighestZIndex = () => {
    var current_max = 0;
    apps.forEach((app) => {
      current_max = app.zIndex >= current_max ? app.zIndex : current_max;
    });
    console.log(current_max);
    return current_max + 1;
  };

  const launchApp = (appName) => {
    // setApps([...apps, {}])
    apps[appName] = {
      mode: "normal",
      zIndex: getNextHighestZIndex(),
    };
    console.log(apps);
    setApps(apps);
    focusApp(appName);
  };

  const destroyApp = (appName) => {
    delete apps[appName];
    setApps(apps);
  };

  const minimseApp = (appName) => {
    console.log("minimise");
    console.log(appName);
    setApps(
      apps.map((app) =>
        app.name === appName ? { ...app, mode: "minimised" } : app
      )
    );
  };

  const maximiseApp = (appName) => {
    setApps(
      apps.map((app) =>
        app.name === appName ? { ...app, mode: "maximised" } : app
      )
    );
  };

  const compressApp = (appName) => {
    setApps(
      apps.map((app) =>
        app.name === appName ? { ...app, mode: "normal" } : app
      )
    );
  };

  const focusApp = (appName) => {
    setApps(
      apps.map((app) => {
        if (app.name === appName) {
          return {
            ...app,
            // mode: "normal",
            zIndex: getNextHighestZIndex(),
            hasFocus: true,
          };
        } else {
          return { ...app, hasFocus: false };
        }
      })
    );
  };
  return (
    <div className={styles.window_manager}>
      {/* Windows */}
      {apps.map((app, index) => {
        return (
          <Window
            key={index}
            title={app.title}
            icon={app.icon}
            closable={app.closable}
            maximisable={app.maximisable}
            hasFocus={app.hasFocus}
            width={app.width}
            height={app.height}
            lockAspectRatio={app.lockAspectRatio}
            mode={app.mode}
            zIndex={app.zIndex}
            onClickMinimise={() => minimseApp(app.name)}
            onClickMaximise={() => maximiseApp(app.name)}
            onClickCompress={() => compressApp(app.name)}
            onClickClose={() => destroyApp(app.name)}
            onMouseDown={() => focusApp(app.name)}
          >
            {app.component}
          </Window>
        );
      })}

      <Tray
        apps={props.installed_apps.map((installed_app) => ({
          title: installed_app.title,
          icon: installed_app.icon,
          hasFocus: false,
          onClick: () => {
            console.log("click");
            launchApp(installed_app.name);
          },
        }))}
      />
    </div>
  );
}
