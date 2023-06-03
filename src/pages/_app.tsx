import "~/styles/base.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "~/lib/mui-theme";
import { useStore } from "~/zustand";
import { cfetchPromise } from "~/lib/cfetch";
import useIsomorphicLayoutEffect from "~/hooks/useIsomorphicLayoutEffect";
import SEO from "~/components/SEO";
import { useEffect } from "react";
import { IUser } from "~/types";

function App({ Component, pageProps }) {
  const setUser = useStore((state) => state.setUser);

  // See: https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect
  useIsomorphicLayoutEffect(() => {
    // to avoid state updates after component unmount
    // see: https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
    let isActive = true;
    try {
      (async () => {
        const userResult = await cfetchPromise<IUser>("/api/users/me", {
          method: "GET",
        });
        if (isActive) setUser(userResult);
      })();
    } catch (err) {
      console.error(err);
    }
    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    // source: https://stackoverflow.com/questions/32963400/android-keyboard-shrinking-the-viewport-and-elements-using-unit-vh-in-css
    setTimeout(() => {
      let viewheight = window.innerHeight;
      let viewWidth = window.innerWidth;
      let viewport = document.querySelector(
        "meta[name=viewport]"
      ) as HTMLMetaElement;
      if (!viewport) {
        console.error("Please set viewport meta tag!");
        return;
      }
      viewport?.setAttribute(
        "content",
        `height=${viewheight},width=${viewWidth},initial-scale=1.0`
      );
    }, 300);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <SEO />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;
