import {
  CreatedTheme,
  createTheme,
  DefaultGlobalStyles,
  defaultTheme,
} from "@gsandf/ui";
import { createGlobalStyle } from "styled-components";

/**
 * Add global styles here. This is mainly used for styling general HTML elements.
 */
const GlobalStyles = createGlobalStyle`
  a:not([class]) {
    color: inherit;
    text-decoration: underline;

    :hover {
      text-decoration: none;
    }
  }
`;

/**
 * `globalStyles()` combines the default global styles with additional global
 * styles.
 *
 * The default global styles include a CSS normalize and various basic defaults,
 * including `box-sizing: border-box`, removed body margin, default text styles,
 * etc. If you don't need these, this can be removed, and `GlobalStyles` can be
 * passed directly to `createTheme()`. For example:
 *
 * ```ts
 * createTheme({ styles: GlobalStyles })
 * ```
 */
const globalStyles = () => {
  return (
    <>
      <DefaultGlobalStyles />
      <GlobalStyles />
    </>
  );
};

const themeOverrides = {
  ...defaultTheme,
  styles: globalStyles,
};

export const theme = createTheme(themeOverrides);

export const {
  breakpoints,
  borders,
  colors,
  components,
  fontSizes,
  fontWeights,
  fonts,
  lineHeights,
  media,
  mixins,
  radii,
  shadows,
  sizes,
  space,
  styles,
  zIndices,
} = theme;

export default theme;

type FileExplorerTheme = CreatedTheme<typeof themeOverrides>;

declare module "styled-components" {
  interface DefaultTheme extends FileExplorerTheme {}
}
