"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Theme = "light" | "dark";

/*
    setTheme is not used anywhere, I can remove it
*/
type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const STORAGE_KEY = "color-theme";

const ThemeContext = createContext<ThemeContextValue | null>(null);

/*
  Sets the DOM theme attributes
 */
function setDocumentTheme(nextTheme: Theme) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.dataset.theme = nextTheme;
  root.style.colorScheme = nextTheme;
}

function getSystemPreference(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // lazy initialization using lazy utilizer function
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const themeFromScript = document.documentElement.dataset.theme;
      if (themeFromScript === "light" || themeFromScript === "dark")
        return themeFromScript;

      const storedPreference = window.localStorage.getItem(STORAGE_KEY);

      if (storedPreference === "light" || storedPreference === "dark") {
        return storedPreference;
      }

      const systemPreference = getSystemPreference();
      return systemPreference;
    }
    return "light";
  });

  useEffect(() => {
    // const storedPreference = window.localStorage.getItem(STORAGE_KEY);
    // const systemPreference = getSystemPreference();
    // const initialTheme =
    //   storedPreference === "light" || storedPreference === "dark"
    //     ? storedPreference
    //     : systemPreference;

    // applyTheme(initialTheme);

    setDocumentTheme(theme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (event: MediaQueryListEvent) => {
      const userPreference = window.localStorage.getItem(STORAGE_KEY);

      // Follow system changes only when the user has not set an explicit preference.
      if (userPreference === "light" || userPreference === "dark") {
        return;
      }

      const nextTheme = event.matches ? "dark" : "light";
      setThemeState(nextTheme);
      setDocumentTheme(nextTheme);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  /*
    setTheme is not used anywhere, I can remove it
  */
  const setTheme = useCallback((nextTheme: Theme) => {
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    setThemeState(nextTheme);
    setDocumentTheme(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prevTheme) => {
      const nextTheme = prevTheme === "light" ? "dark" : "light";

      // set the new value in localstorage
      window.localStorage.setItem(STORAGE_KEY, nextTheme);

      // update the DOM theme attributes
      setDocumentTheme(nextTheme);

      // return the new value as state
      return nextTheme;
    });
  }, []);

  /*
    setTheme is not used anywhere, I can remove it
  */
  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
