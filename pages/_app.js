import "bootstrap/dist/css/bootstrap.css";
import { SWRConfig } from "swr";
import '../public/app.css';

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
