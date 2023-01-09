import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        light: "#0c0c1e",
        grey: "#060714",
        dark: "#fbfbfb",
        blue: "#3c91e6",
        lightBlue: "#cfe8ff",
        darkGrey: "#aaaaaa",
        red: "#db504a",
        yellow: "#ffce26",
        lightYellow: "#fff2c6",
        orange: "#fd7238",
        lightOrange: "#ffe0d3",
      }
    : {
        light: "#f9f9f9",
        grey: "#eee",
        dark: "#342e37",
        blue: "#3c91e6",
        lightBlue: "#cfe8ff",
        darkGrey: "#aaaaaa",
        red: "#db504a",
        yellow: "#ffce26",
        lightYellow: "#fff2c6",
        orange: "#fd7238",
        lightOrange: "#ffe0d3",
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);

  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.light,
            },
            secondary: {
              main: colors.grey,
            },
            neutral: {
              dark: colors.dark,
              main: colors.grey,
              light: colors.light,
            },
            background: {
              default: colors.dark,
            },
          }
        : {
            primary: {
              main: colors.dark,
            },
            secondary: {
              main: colors.grey,
            },
            neutral: {
              dark: colors.dark,
              main: colors.grey,
              light: colors.light,
            },
            background: {
              // default: colors.primary[500],
              default: colors.light,
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-sarif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-sarif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-sarif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-sarif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-sarif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-sarif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-sarif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for the color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};

export function ColorModeProvider({ children }) {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      {children}
    </ColorModeContext.Provider>
  );
}
