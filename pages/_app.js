import "../styles/globals.scss";
import "../styles/code-highlighting.scss";

import Layout from "../components/Layout";
import { RecoilRoot } from "recoil";
import { IconContext } from "react-icons";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <IconContext.Provider value={{ className: "icon" }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </IconContext.Provider>
    </RecoilRoot>
  );
}

export default MyApp;
