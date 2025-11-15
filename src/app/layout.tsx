import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "School Ride Fleet",
  description: "Manage your school bus fleet efficiently",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex flex-row pb-3`}
      >
        <MantineProvider defaultColorScheme="light">
          <Notifications position="top-right" zIndex={1000} />
          <div className="flex flex-1">{children}</div>
        </MantineProvider>
      </body>
    </html>
  );
}
