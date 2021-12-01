import { useState, useRef, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTerminal,
  faGlobeEurope,
  faGift,
} from "@fortawesome/free-solid-svg-icons";

import Window from "../Window";
import Tray from "../Tray";

import SlimeSoccer from "../SlimeSoccer";
import WorldWar from "../WorldWar";
import Terminal from "../Terminal";

import styles from "./WindowManager.module.scss";

export default function WindowManager(props) {
  const [apps, setApps] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    setApps([
      {
        name: "terminal",
        title: "terminal",
        width: 350,
        height: 350,
        component: <Terminal openApp={openApp} />,
        icon: <FontAwesomeIcon icon={faTerminal} />,
        closable: false,
        maximisable: true,
      },
      {
        name: "worldWar",
        title: "world war",
        width: 800,
        height: 450,
        component: <WorldWar />,
        icon: <FontAwesomeIcon icon={faGlobeEurope} />,
        closable: true,
        maximisable: true,
        lockAspectRatio: true,
      },
      // {
      //   name: "secretSanta",
      //   title: "secret santa",
      //   width: 700,
      //   height: 600,
      //   // component: <SecretSanta />,
      //   component: <div>Hello world</div>,
      //   icon: <FontAwesomeIcon icon={faGift} />,
      //   closable: true,
      //   maximisable: true,
      // },
      {
        name: "slimeSoccer",
        title: "slime soccer",
        width: 722,
        height: 460,
        component: <SlimeSoccer />,
        icon: <FontAwesomeIcon icon={faGift} />,
        closable: true,
        maximisable: true,
      },
    ]);
    setTimeout(() => {
      openApp("terminal");
    }, 2000);
  }, []);

  const getNextHighestZIndex = () => {
    var current_max = 0;
    apps.forEach((app) => {
      current_max = app.zIndex >= current_max ? app.zIndex : current_max;
    });
    return current_max + 1;
  };

  const openApp = (appName) => {
    setApps((a) =>
      a.map((app) =>
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

  const unfocusAll = () => {
    setApps(apps.map((app) => ({ ...app, hasFocus: false })));
  };

  return (
    <div
      className={styles.window_manager}
      ref={ref}
      onMouseDown={(e) => {
        if (e.target === ref.current) {
          unfocusAll();
        }
      }}
    >
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
            isOpen={app.isOpen}
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
