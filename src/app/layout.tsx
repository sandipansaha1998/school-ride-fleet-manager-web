import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import "@mantine/core/styles.layer.css";
import "mantine-datatable/styles.layer.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>{/* <ColorSchemeScript defaultColorScheme="auto" /> */}</head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex flex-row pb-3`}
      >
        <MantineProvider>
          <Sidebar />
          <div className="flex-1 overflow-hidden ">{children}</div>
        </MantineProvider>
      </body>
    </html>
  );
}
