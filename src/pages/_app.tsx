import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import theme from "theme/index";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    // @ts-expect-error - This _is_ a JSX component; not sure why type is wrong
    <ThemeProvider theme={theme}>
      {/* @ts-expect-error - This _is_ a JSX component; not sure why type is wrong */}
      <theme.styles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
