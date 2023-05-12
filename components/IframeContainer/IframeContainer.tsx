import { useEffect, useState } from "react";
import styles from "./IframeContainer.module.scss";

interface IframeContainerProps {
  url: string;
}

export default function IframeContainer({ url }: IframeContainerProps) {
  const [iframe, setIframe] = useState(null);
  useEffect(() => {
    setIframe(<iframe src={url} allowFullScreen={false} width="100%" height="100%" />);
  }, [url]);
  return <div className={styles.iframe}>{iframe}</div>;
}
