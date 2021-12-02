import { useEffect, useState } from "react";
import styles from "./SlimeSoccer.module.scss";

export default function SlimeSoccer(props) {
  const [game, setGame] = useState(null);
  useEffect(() => {
    setGame(
      <iframe
        frameBorder="0"
        src="https://itch.io/embed-upload/4800053?color=333333"
        allowFullScreen=""
        width="100%"
        height="100%"
      >
        <a href="https://hectorbennett.itch.io/slime-soccer">
          Play slime soccer (remake) on itch.io
        </a>
      </iframe>
    );
  }, []);
  return <div className={styles.slime_soccer}>{game}</div>;
}
