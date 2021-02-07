import "bootstrap/dist/css/bootstrap.css";
import { SWRConfig } from "swr";
import '../public/app.css';
import React, { useEffect } from 'react';

function MyApp({ Component, pageProps }) {

  return (
    <SWRConfig
      value={{
        fetcher: fetch,
        onError: (err) => {
          console.error(err);
        },
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
