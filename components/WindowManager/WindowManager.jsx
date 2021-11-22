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
    return current_max + 1;
  };

  const openApp = (appName) => {
    setApps(
      apps.map((app) =>
        app.name === appName
          ? {
              ...app,
              isOpen: true,
              hasFocus: true,
              zIndex: getNextHighestZIndex(),
            }
          : { ...app, hasFocus: false }
      )
    );
  };

  const closeApp = (appName) => {
    setApps(
      apps.map((app) =>
        app.name === appName ? { ...app, isOpen: false, hasFocus: false } : app
      )
    );
  };

  const minimiseApp = (appName) => {
    setApps(
      apps.map((app) =>
        app.name === appName
          ? { ...app, isMinimised: true, hasFocus: false }
          : app
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
            zIndex: getNextHighestZIndex(),
            hasFocus: true,
            isMinimised: false,
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
      {apps
        .filter((app) => app.isOpen)
        .map((app, index) => {
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
              isMinimised={app.isMinimised}
              zIndex={app.zIndex}
              onClickMinimise={() => minimiseApp(app.name)}
              onClickMaximise={() => maximiseApp(app.name)}
              onClickCompress={() => compressApp(app.name)}
              onClickClose={() => closeApp(app.name)}
              onMouseDown={() => focusApp(app.name)}
            >
              {app.component}
            </Window>
          );
        })}

      <Tray
        apps={apps.map((app) => ({
          title: app.title,
          icon: app.icon,
          hasFocus: app.hasFocus,
          isOpen: app.isOpen,
          onClick: () => {
            if (!app.isOpen) {
              openApp(app.name);
            } else if (app.hasFocus) {
              minimiseApp(app.name);
            } else {
              focusApp(app.name);
            }
          },
        }))}
      />
    </div>
  );
}
