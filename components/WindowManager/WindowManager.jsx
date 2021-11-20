import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTerminal,
  faGlobeEurope,
  faGift,
} from "@fortawesome/free-solid-svg-icons";

import Window from "../Window";

// import Terminal from "../Terminal/Terminal.js";
// import WorldWar from "../WorldWar/WorldWar.js";
// import SecretSanta from "../SecretSanta/SecretSanta.js";

import styles from "./WindowManager.module.scss";

const APPS = [
  {
    name: "terminal",
    title: "terminal",
    width: 500,
    height: 500,
    // component: <Terminal WM={this} />,
    component: <div>Hello world</div>,
    icon: <FontAwesomeIcon icon={faTerminal} />,
    closable: false,
    maximisable: true,
  },
  {
    name: "worldWar",
    title: "world war",
    width: 800,
    height: 450,
    // component: <WorldWar />,
    component: <div>Hello world</div>,
    icon: <FontAwesomeIcon icon={faGlobeEurope} />,
    closable: true,
    maximisable: true,
    lockAspectRatio: true,
  },
  {
    name: "secretSanta",
    title: "secret santa",
    width: 700,
    height: 600,
    // component: <SecretSanta />,
    component: <div>Hello world</div>,
    icon: <FontAwesomeIcon icon={faGift} />,
    closable: true,
    maximisable: true,
  },
];



export default function WindowManager(props) {
  const [apps, setApps] = useState({
    terminal: {
      isminimsed: false,
      zIndex: 1,
      hasFocus: true,
    },
  });

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
      {APPS.map((item, index) => {
        if (apps[item.name] && !apps[item.name].isminimsed) {
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
    </div>
  );
}
