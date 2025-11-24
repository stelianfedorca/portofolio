import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

import StyledComponentsRegistry from "@/lib/registry";
import StickyHeader from "@/components/StickyHeader";

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
    <html lang="en">
      <body className={plusJakartaSans.variable}>
        <StyledComponentsRegistry>
          <StickyHeader />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
