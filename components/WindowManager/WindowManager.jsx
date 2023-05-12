import { useState, useRef, useEffect, useCallback } from "react";

import { RiSwordLine, RiTerminalLine, RiGamepadLine } from "react-icons/ri";
import { FaCogs, FaWaveSquare } from "react-icons/fa";

import Window from "../Window";
import Tray from "../Tray";

import IframeContainer from "../IframeContainer";
import WorldWar from "../WorldWar";
import Terminal from "../Terminal";
import Gears from "../Gears";

import styles from "./WindowManager.module.scss";

let highestZIndex = 0;

export default function WindowManager(props) {
  const [apps, setApps] = useState([]);
  const ref = useRef(null);

  const openApp = useCallback((appName) => {
    setApps((a) =>
      a.map((app) =>
        app.name === appName
          ? {
              ...app,
              isOpen: true,
              hasFocus: true,
              zIndex: getNextHighestZIndex(),
            }
          : { ...app, hasFocus: false },
      ),
    );
  }, []);

  useEffect(() => {
    setApps([
      {
        name: "terminal",
        title: "terminal",
        width: 350,
        height: 350,
        component: <Terminal openApp={openApp} />,
        icon: <RiTerminalLine />,
        closable: true,
        maximisable: true,
      },
      {
        name: "worldWar",
        title: "world war",
        width: 800,
        height: 450,
        component: <WorldWar />,
        icon: <RiSwordLine />,
        closable: true,
        maximisable: true,
        lockAspectRatio: true,
      },
      // {
      //   name: "secretSanta",
      //   title: "secret santa",
      //   width: 1200,
      //   height: 600,
      //   component: <SecretSanta />,
      //   icon: <RiGiftLine />,
      //   closable: true,
      //   maximisable: true,
      // },
      {
        name: "slimeSoccer",
        title: "slime soccer",
        width: 722,
        height: 460,
        component: <IframeContainer url="https://itch.io/embed-upload/4800053?color=333333" />,
        icon: <RiGamepadLine />,
        closable: true,
        maximisable: true,
      },
      {
        name: "WaveViz",
        title: "WaveViz",
        width: 800,
        height: 500,
        component: <IframeContainer url="https://wave-viz.hectorbennett.com/" />,
        icon: <FaWaveSquare />,
        closable: true,
        maximisable: true,
      },
      {
        name: "webGLGears",
        title: "WebGLGears",
        width: 500,
        height: 500,
        component: <Gears />,
        icon: <FaCogs />,
        closable: true,
        maximisable: true,
      },
    ]);
    setTimeout(() => {
      // if not a mobile device
      if (!/Mobi/.test(navigator.userAgent)) {
        openApp("terminal");
      }
    }, 2000);
  }, [openApp]);

  function getNextHighestZIndex() {
    highestZIndex += 1;
    return highestZIndex;
  }

  const closeApp = (appName) => {
    setApps((a) =>
      a.map((app) => (app.name === appName ? { ...app, isOpen: false, hasFocus: false } : app)),
    );
  };

  const minimiseApp = (appName) => {
    setApps((a) =>
      a.map((app) => (app.name === appName ? { ...app, isMinimised: true, hasFocus: false } : app)),
    );
  };

  const maximiseApp = (appName) => {
    setApps((a) => a.map((app) => (app.name === appName ? { ...app, mode: "maximised" } : app)));
  };

  const compressApp = (appName) => {
    setApps((a) => a.map((app) => (app.name === appName ? { ...app, mode: "normal" } : app)));
  };

  const focusApp = (appName) => {
    setApps((a) =>
      a.map((app) => {
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
      }),
    );
  };

  const unfocusApp = (appName) => {
    setApps((a) =>
      a.map((app) => {
        if (app.name === appName) {
          return {
            ...app,
            hasFocus: false,
          };
        } else {
          return app;
        }
      }),
    );
  };

  return (
    <div className={styles.window_manager} ref={ref}>
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
            onMouseDown={() => setTimeout(focusApp(app.name), 10)}
            onClickOutside={() => unfocusApp(app.name)}
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
