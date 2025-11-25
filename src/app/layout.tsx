import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

import StyledComponentsRegistry from "@/lib/registry";
import StickyHeader from "@/components/StickyHeader";
import { ThemeProvider } from "@/components/ThemeProvider";

// injected at compile time and executed at run time
const themeScript = `
(() => {
  try {
    const storageKey = 'color-theme';
    const storedPreference = window.localStorage.getItem(storageKey);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const systemPreference = mediaQuery.matches ? 'dark' : 'light';

    const theme =
      storedPreference === 'light' || storedPreference === 'dark'
        ? storedPreference
        : systemPreference;

    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch (error) {}
})();
`;

export const metadata: Metadata = {
  title: "Stelian Fedorca | Frontend Engineer",
  description:
    "Portfolio of Stelian Fedorca, a Frontend Engineer based in Romania.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={plusJakartaSans.variable}>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <StickyHeader />
            {children}
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
