import siteConfig from "@/config/site";
import { NextSeo } from "next-seo";

import "@/styles/globals.css";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <NextSeo
        title={siteConfig.details.title}
        description={siteConfig.details.description}
        openGraph={{
          url: siteConfig.details.url,
          title: siteConfig.details.title,
          description: siteConfig.details.description,
          images: [
            {
              url: `${siteConfig.details.url}${siteConfig.assets.image}`,
              width: 1012,
              height: 506,
              alt: siteConfig.details.title,
              type: "image/png",
            },
          ],
          siteName: siteConfig.details.title,
          type: "website",
          locale: "id_ID",
        }}
      />
      <Component {...pageProps} />
    </>
  );
};

export default App;
