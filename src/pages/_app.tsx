import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import theme from "theme/index";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <ThemeProvider theme={theme}>
      <theme.styles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
